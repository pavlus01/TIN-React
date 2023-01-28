import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { loginApiCall } from "../../apiCalls/authApiCalls";
import { formValidationKeys } from "../../helpers/formHelper";
import { checkRequired } from "../../helpers/validationCommon";
import FormButtons from "../form/FormButtons";
import FormInput from "../form/FormInput";

function LoginForm(props) {
    const [user, setUser] = useState(
        {
            email: '',
            password: ''
        }
    )
    const [errors, setErrors] = useState(
        {
            email: '',
            password: ''
        }
    )
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)

    const { t } = useTranslation()
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()

        if (isValid) {
            let response
            loginApiCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data)
                                props.handleLogin(userString)
                                navigate(-1)
                            } else if (response.status === 401) {
                                setMessage(data.message)
                            }
                        }
                    },
                    (error) => {
                        setIsLoaded(true)
                        setError(error)
                    }
                )
        }
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        return errorMessage
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = { ...errors }
        Object.entries(user).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function hasErrors() {
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                return true
            }
        })
        return false
    }

    const errorsSummary = hasErrors() ? t('form.validation.messages.formErrors') : ''
    const fetchError = error ? `${t('error')}: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    return (
        <main>
            <div id="login">
                <h2>{t('auth.pageTitle')}</h2>
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <FormInput 
                        name="email" 
                        value={user.email} 
                        error={errors.email} 
                        label={t('klient.fields.email')} 
                        onChange={handleChange} 
                        type="text"
                    />
                    <FormInput 
                        name="password" 
                        value={user.password} 
                        error={errors.password} 
                        label="Password" 
                        onChange={handleChange} 
                        type="password"
                    />
                    <FormButtons 
                        cancelPath="/"
                        error = {globalErrorMessage}
                        submitButtonLabel={t('form.actions.login')}
                    />
                </form>
            </div>
        </main>
    )
}

export default LoginForm