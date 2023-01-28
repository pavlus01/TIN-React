import React from "react"
import { getKlientApiCall } from '../../apiCalls/klientApiCalls'
import { getPortfelByIdApiCall, addPortfelApiCall, updatePortfelApiCall} from '../../apiCalls/portfelApiCalls'
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkNumber, checkNumberRange} from '../../helpers/validationCommon'
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

function PortfelForm() {

    const [portfel, setPortfel] = useState({
        nr_karty: '',
        saldo_konta: '',
        klient_Id: ''
    })
    const [errors, setErrors] = useState({
        nr_karty: '',
        saldo_konta: '',
        klient_Id: ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [klienci, setKlienci] = useState([])
    

    const { portfelId } = useParams()
    const currentFormMode = portfelId ? formMode.EDIT : formMode.NEW
    const navigate = useNavigate()
    const { t } = useTranslation();

        function fetchPortfelForm() {
            getPortfelByIdApiCall(portfelId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setPortfel(data)
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

        function fetchKlientList() {
            getKlientApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setKlienci(data)
                    setIsLoaded(true)
                },
                (error) => {
                    setError(error)
                    setIsLoaded(true)
                    
                }
            )
        }

        useEffect(() => {
            fetchKlientList()
            if (currentFormMode === formMode.EDIT) {
                fetchPortfelForm()
            }
        }, [])
        

        function handleChange(event) {
            const { name, value } = event.target
            const errorMessage = validateField(name, value)
            setErrors({
                ...errors,
                [name]: errorMessage
            })
            setPortfel({
                ...portfel,
                [name]: value
            })
        }
        

        function validateField(fieldName, fieldValue) {
            let errorMessage = '';

        if (fieldName === 'nr_karty') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 16, 16)) {
                errorMessage = formValidationKeys.len16
            }}
        
        if (fieldName === 'saldo_konta') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber
            } else if (!checkNumberRange(fieldValue, 0, 1000000)) {
                errorMessage = formValidationKeys.isAbove0
            }}
        
        if (fieldName === 'klient_Id') { 
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
                promise = addPortfelApiCall(portfel)
            } else if (currentFormMode === formMode.EDIT) {
                promise = updatePortfelApiCall(portfelId, portfel)
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
        Object.entries(portfel).forEach(([key, value]) => {
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
            navigate('/Portfel')
        }
    }, [redirect])
    
        const errorsSummary = hasErrors() ? t('form.validaton.messages.formErrors') : ''
        const fetchError = error ? t('list.actions.error') + `: ${error.message}` : ''
        const globalErrorMessage = errorsSummary || fetchError || message
    
        const pageTitle = currentFormMode === formMode.NEW ? t('portfel.form.add.pageTitle') : t('portfel.form.edit.pageTitle')
    
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('portfel.fields.nr_karty')}
                        required
                        error={errors.nr_karty}
                        name="nr_karty"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        onChange={handleChange}
                        value={portfel.nr_karty}
                    />
                    <FormInput
                        type="number"
                        label={t('portfel.fields.saldo_konta')}
                        required
                        error={errors.saldo_konta}
                        name="saldo_konta"
                        placeholder="0-1000000"
                        onChange={handleChange}
                        value={portfel.saldo_konta}
                    />
                    <label htmlFor="klient_Id">{t('nav.klient')}<abbr title="required" aria-label="required">*</abbr></label>
                    <select name="klient_Id" id="klient_Id" class={errors.klient_Id === '' ? 'label-active' : 'error-input'} onChange={handleChange} value={portfel.klient_Id} >
                    <option value="">{t('wypozyczenie.form.placeholder.klient')}</option>
                    {klienci.map(klient =>
                        (<option key={klient._id} value={klient._id} label={klient.imie + " " + klient.nazwisko}></option>)
                    )}
                    </select>
                    <span id={errors.klient_Id} className="errors-text">{errors.klient_Id ? t(getValidationErrorKey(errors.klient_Id)) : ""}</span>

                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/Portfel"
                    />
                </form>
            </main >
        )
    }

export default PortfelForm