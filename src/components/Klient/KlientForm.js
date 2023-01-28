import React from "react"
import { getKlientByIdApiCall, addKlientApiCall, updateKlientApiCall} from '../../apiCalls/klientApiCalls'
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkEmail, checkDate, checkDateIfAfter, checkDateIf18} from '../../helpers/validationCommon'
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

function KlientForm() {

    const [klient, setKlient] = useState({
        imie: '',
        nazwisko: '',
        email: '',
        data_urodzenia: '',
        password: '',
        admin: ''
    })
    const [errors, setErrors] = useState({
        imie: '',
        nazwisko: '',
        email: '',
        data_urodzenia: '',
        password: '',
        admin: ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    

    const { klientId } = useParams()
    const currentFormMode = klientId ? formMode.EDIT : formMode.NEW
    const navigate = useNavigate()
    const { t } = useTranslation();

        function fetchKlientForm() {
            getKlientByIdApiCall(klientId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setKlient(data)
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
                fetchKlientForm()
            }
        }, [])
        

        function handleChange(event) {
            const { name, value } = event.target
            const errorMessage = validateField(name, value)
            setErrors({
                ...errors,
                [name]: errorMessage
            })
            setKlient({
                ...klient,
                [name]: value
            })
        }
        

        function validateField(fieldName, fieldValue) {
            let errorMessage = '';

        if (fieldName === 'imie') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 3, 25)) {
                errorMessage = formValidationKeys.len_3_25
            }}
        
        if (fieldName === 'nazwisko') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 45)) {
                errorMessage = formValidationKeys.len_2_45
            }}
        
        if (fieldName === 'email') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = formValidationKeys.len_5_60
            } else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail
            }}
        
            let nowDate = new Date(),
            month = '' + (nowDate.getMonth() + 1),
            day = '' + nowDate.getDate(),
            year = nowDate.getFullYear();
        
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
                
            const nowString = [year, month, day].join('-');
        
        if (fieldName === 'data_urodzenia') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.isYear
            } else if (!checkDateIfAfter(fieldValue, nowString)) {
                errorMessage = formValidationKeys.isFutureDate
            } else if (!checkDateIf18(fieldValue, nowString)) {
                errorMessage = formValidationKeys.is18
            }}

        if (fieldName === 'password') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }}

        if (fieldName === 'admin') { 
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
                promise = addKlientApiCall(klient)
            } else if (currentFormMode === formMode.EDIT) {
                promise = updateKlientApiCall(klientId, klient)
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
        Object.entries(klient).forEach(([key, value]) => {
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
            navigate('/Klient')
        }
    }, [redirect])
    
        const errorsSummary = hasErrors() ? t('form.validaton.messages.formErrors') : ''
        const fetchError = error ? t('list.actions.error') + `: ${error.message}` : ''
        const globalErrorMessage = errorsSummary || fetchError || message
    
        const pageTitle = currentFormMode === formMode.NEW ? t('klient.form.add.pageTitle') : t('klient.form.edit.pageTitle')
    
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('klient.fields.imie')}
                        required
                        error={errors.imie}
                        name="imie"
                        placeholder="3-35"
                        onChange={handleChange}
                        value={klient.imie}
                    />
                    <FormInput
                        type="text"
                        label={t('klient.fields.nazwisko')}
                        required
                        error={errors.nazwisko}
                        name="nazwisko"
                        placeholder="2-45"
                        onChange={handleChange}
                        value={klient.nazwisko}
                    />
                    <FormInput
                        type="email"
                        label={t('klient.fields.email')}
                        required
                        error={errors.email}
                        name="email"
                        placeholder="np. nazwa@domena.pl"
                        onChange={handleChange}
                        value={klient.email}
                    />
                    <FormInput
                        type="date"
                        label={t('klient.fields.data_urodzenia')}
                        required
                        error={errors.data_urodzenia}
                        name="data_urodzenia"
                        placeholder="YYYY-MM-DD"
                        onChange={handleChange}
                        value={klient.data_urodzenia ? getFormattedDate(klient.data_urodzenia) : ''}
                    />
                    <FormInput
                        type="password"
                        label={t('klient.fields.password')}
                        required
                        error={errors.password}
                        name="password"
                        placeholder="*******"
                        onChange={handleChange}
                        value={klient.password}
                    />
                    
                    <label htmlFor="admin">{"Admin"}<abbr title="required" aria-label="required">*</abbr></label>
                    <select name="admin" id="admin" class={errors.admin === '' ? 'label-active' : 'error-input'} onChange={handleChange} value={klient.admin} >
                    <option key={0} value={0} label={"False"}></option>
                    <option key={1} value={1} label={"True"}></option> 
                    </select>
                    <span id={errors.admin} className="errors-text">{errors.admin ? t(getValidationErrorKey(errors.admin)) : ""}</span>

                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/Klient"
                    />
                </form>
            </main >
        )
    }

export default KlientForm