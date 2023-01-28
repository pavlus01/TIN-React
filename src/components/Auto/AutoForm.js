import React from "react"
import { getAutoByIdApiCall, addAutoApiCall, updateAutoApiCall} from '../../apiCalls/autoApiCalls'
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkNumber, checkNumberRange, } from '../../helpers/validationCommon'
import { getWypozyczalniaApiCall } from '../../apiCalls/wypozyczalniaApiCalls'
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { formValidationKeys } from '../../helpers/formHelper'
import { getValidationErrorKey } from '../../helpers/formHelper'

function AutoForm() {

    const [auto, setAuto] = useState({
        producent: '',
        model: '',
        rok_produkcji: '',
        kolor: '',
        moc_silnika: '',
        wypozyczalnia: ''
    })
    const [errors, setErrors] = useState({
        producent: '',
        model: '',
        rok_produkcji: '',
        kolor: '',
        moc_silnika: '',
        wypozyczalnia: ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [isLoadedW, setIsLoadedW] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [wypozyczalnie, setWypozyczalnie] = useState([])
    

    const { autoId } = useParams()
    const currentFormMode = autoId ? formMode.EDIT : formMode.NEW
    const navigate = useNavigate()
    const { t } = useTranslation();

        function fetchAutoForm() {
            getAutoByIdApiCall(autoId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setAuto(data)
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

        function fetchWypozyczalnieList() {
            getWypozyczalniaApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoadedW(true)
                    setWypozyczalnie(data)
                },
                (error) => {
                    setIsLoadedW(true)
                    setError(error)
                    
                }
            )
        }

        useEffect(() => {
            fetchWypozyczalnieList()
            if (currentFormMode === formMode.EDIT) {
                fetchAutoForm()
            }
        }, [])
        

        function handleChange(event) {
            const { name, value } = event.target
            const errorMessage = validateField(name, value)
            setErrors({
                ...errors,
                [name]: errorMessage
            })
            setAuto({
                ...auto,
                [name]: value
            })
        }
        
        

        function validateField(fieldName, fieldValue){
            let errorMessage = '';

         if (fieldName === 'producent') {  
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 3, 25)) {
                errorMessage = formValidationKeys.len_3_25
            }}

         if (fieldName === 'model') {  
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
                errorMessage = formValidationKeys.len_2_20
            }}

         if (fieldName === 'rok_produkcji') {  
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber
            } else if (!checkNumberRange(fieldValue, 1800, new Date().getFullYear())) {
                errorMessage = formValidationKeys.is1800
            }}
        
         if (fieldName === 'kolor') {      
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 3, 25)) {
                errorMessage = formValidationKeys.len_3_25
            }}
        
         if (fieldName === 'moc_silnika') {      
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber
            } else if (!checkNumberRange(fieldValue, 100, 999)) {
                errorMessage = formValidationKeys.is100_999
            } }

            if (fieldName === 'wypozyczalnia') {     
                if (!checkRequired(fieldValue)) {
                    errorMessage = formValidationKeys.notEmpty
                }}
        return errorMessage
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === formMode.NEW) {
                promise = addAutoApiCall(auto)
            } else if (currentFormMode === formMode.EDIT) {
                promise = updateAutoApiCall(autoId, auto)
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
        Object.entries(auto).forEach(([key, value]) => {
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
            navigate('/Auto')
        }
    }, [redirect])
    
        const errorsSummary = hasErrors() ? t('form.validaton.messages.formErrors') : ''
        const fetchError = error ? t('list.actions.error') + `: ${error.message}` : ''
        const globalErrorMessage = errorsSummary || fetchError || message
    
        const pageTitle = currentFormMode === formMode.NEW ? t('auto.form.add.pageTitle') : t('auto.form.edit.pageTitle')
        const wypozyczalniaId = formMode.EDIT ? auto.wypozyczalnia._id : ''

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('auto.fields.producent')}
                        required
                        error={errors.producent}
                        name="producent"
                        placeholder="3-25"
                        onChange={handleChange}
                        value={auto.producent}
                    />
                    <FormInput
                        type="text"
                        label={t('auto.fields.model')}
                        required
                        error={errors.model}
                        name="model"
                        placeholder="2-20"
                        onChange={handleChange}
                        value={auto.model}
                    />
                    <FormInput
                        type="number"
                        label={t('auto.fields.rok_produkcji')}
                        required
                        error={errors.rok_produkcji}
                        name="rok_produkcji"
                        placeholder="1800+"
                        onChange={handleChange}
                        value={auto.rok_produkcji}
                    />
                    <FormInput
                        type="text"
                        label={t('auto.fields.kolor')}
                        required
                        error={errors.kolor}
                        name="kolor"
                        placeholder="3-25"
                        onChange={handleChange}
                        value={auto.kolor}
                    />
                    <FormInput
                        type="number"
                        label={t('auto.fields.moc_silnika')}
                        required
                        error={errors.moc_silnika}
                        name="moc_silnika"
                        placeholder="100-999"
                        onChange={handleChange}
                        value={auto.moc_silnika}
                    />

                    <label htmlFor="wypozyczalnia">{t('auto.fields.wypozyczalnia')}<abbr title="required" aria-label="required">*</abbr></label>
                    <select name="wypozyczalnia" id="wypozyczalnia" class={errors.wypozyczalnia === '' ? 'label-active' : 'error-input'} onChange={handleChange} value={wypozyczalniaId} >
                    <option value="">{t('wypozyczenie.form.placeholder.wypozyczalnia')}</option>
                    {wypozyczalnie.map(wypo =>
                        (<option key={wypo._id} value={wypo._id} label={wypo.miasto + " " + wypo.ulica}></option>)
                    )}
                    </select>
                    <span id={errors.wypozyczalnia} class="errors-text">{errors.wypozyczalnia ? t(getValidationErrorKey(errors.wypozyczalnia)) : ""}</span>

                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/Auto"
                    />
                </form>
            </main >
        )
    }

export default AutoForm