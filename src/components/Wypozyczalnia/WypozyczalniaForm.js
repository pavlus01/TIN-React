import React from "react"
import { getWypozyczalniaIdApiCall, addWypozyczalniaApiCall, updateWypozyczalniaApiCall} from '../../apiCalls/wypozyczalniaApiCalls'
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange} from '../../helpers/validationCommon'
import {Navigate} from 'react-router-dom';
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import { getFormattedDate } from '../../helpers/dateHelper'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { formValidationKeys } from '../../helpers/formHelper'
import { getValidationErrorKey } from '../../helpers/formHelper'

function WypozyczalniaForm() {

    const [wypozyczalnia, setWypozyczalnia] = useState({
        ulica: '',
        numer: '',
        kod: '',
        miasto: '',
    })
    const [errors, setErrors] = useState({
        ulica: '',
        numer: '',
        kod: '',
        miasto: '',
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    

    const { wypozyczalniaId } = useParams()
    const currentFormMode = wypozyczalniaId ? formMode.EDIT : formMode.NEW
    const navigate = useNavigate()
    const { t } = useTranslation();

        function fetchWypozyczalniaForm() {
            getWypozyczalniaIdApiCall(wypozyczalniaId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setWypozyczalnia(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
        }

        useEffect(() => {
            if (currentFormMode === formMode.EDIT) {
                fetchWypozyczalniaForm()
            }
        }, [])
        

        function handleChange(event) {
            const { name, value } = event.target
            const errorMessage = validateField(name, value)
            setErrors({
                ...errors,
                [name]: errorMessage
            })
            setWypozyczalnia({
                ...wypozyczalnia,
                [name]: value
            })
        }
        

        function validateField(fieldName, fieldValue) {
            let errorMessage = '';

        if (fieldName === 'ulica') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 3, 25)) {
                errorMessage = formValidationKeys.len_3_25
            }}
        
        if (fieldName === 'numer') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 4)) {
                errorMessage = formValidationKeys.len_2_4
            }}
        
        if (fieldName === 'miasto') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 3, 25)) {
                errorMessage = formValidationKeys.len_3_25
            }}
        
        if (fieldName === 'kod') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 6, 6)) {
                errorMessage = formValidationKeys.len6
            }}

        return errorMessage
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === formMode.NEW) {
                promise = addWypozyczalniaApiCall(wypozyczalnia)
            } else if (currentFormMode === formMode.EDIT) {
                promise = updateWypozyczalniaApiCall(wypozyczalniaId, wypozyczalnia)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }
    

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(wypozyczalnia).forEach(([key, value]) => {
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

    useEffect(() => {
        if (redirect) {
            navigate('/Wypozyczalnia')
        }
    }, [redirect])
    
        const errorsSummary = hasErrors() ? t('form.validaton.messages.formErrors') : ''
        const fetchError = error ? t('list.actions.error') + `: ${error.message}` : ''
        const globalErrorMessage = errorsSummary || fetchError || message
    
        const pageTitle = currentFormMode === formMode.NEW ? t('wypozyczalnia.form.add.pageTitle') : t('wypozyczalnia.form.edit.pageTitle')
    
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('wypozyczalnia.fields.ulica')}
                        required
                        error={errors.ulica}
                        name="ulica"
                        placeholder="3-35"
                        onChange={handleChange}
                        value={wypozyczalnia.ulica}
                    />
                    <FormInput
                        type="text"
                        label={t('wypozyczalnia.fields.numer')}
                        required
                        error={errors.numer}
                        name="numer"
                        placeholder="2-4"
                        onChange={handleChange}
                        value={wypozyczalnia.numer}
                    />
                    <FormInput
                        type="text"
                        label={t('wypozyczalnia.fields.kod')}
                        required
                        error={errors.kod}
                        name="kod"
                        placeholder="**-***"
                        onChange={handleChange}
                        value={wypozyczalnia.kod}
                    />
                    <FormInput
                        type="text"
                        label={t('wypozyczalnia.fields.miasto')}
                        required
                        error={errors.miasto}
                        name="miasto"
                        placeholder="3-25"
                        onChange={handleChange}
                        value={wypozyczalnia.miasto}
                    />
                    
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/Wypozyczalnia"
                    />
                </form>
            </main >
        )
    }

export default WypozyczalniaForm