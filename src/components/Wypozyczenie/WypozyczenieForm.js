import React from "react"
import { getKlientApiCall } from '../../apiCalls/klientApiCalls'
import { getAutoApiCall } from '../../apiCalls/autoApiCalls'
import { getWypozyczenieByIdApiCall, addWypozyczenieApiCall, updateWypozyczenieApiCall } from '../../apiCalls/wypozyczenieApiCalls'
import formMode from '../../helpers/formHelper'
import { checkRequired, checkDate, checkDateIfAfter } from '../../helpers/validationCommon'
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

function WypozyczenieForm() {

    const [wypozyczenie, setWypozyczenie] = useState({
        klient: '',
        auto: '',
        data_wypozyczenia: '',
        data_zwrotu: '',
    })
    const [errors, setErrors] = useState({
        klient: '',
        auto: '',
        data_wypozyczenia: '',
        data_zwrotu: '',
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [isLoadedA, setIsLoadedA] = useState(null)
    const [isLoadedK, setIsLoadedK] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [auta, setAuta] = useState([])
    const [klienci, setKlienci] = useState([])
    

    const { wypozyczenieId } = useParams()
    const currentFormMode = wypozyczenieId ? formMode.EDIT : formMode.NEW
    const navigate = useNavigate()
    const { t } = useTranslation();

    useEffect(() => {
            fetchAutoList()
            fetchKlientList()
        if (currentFormMode === formMode.EDIT) {
            fetchWypozyczenieForm()
        }
    }, [])
    

        function fetchWypozyczenieForm() {
            getWypozyczenieByIdApiCall(wypozyczenieId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setWypozyczenie(data)
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

        function fetchAutoList() {
            getAutoApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoadedA(true)
                    setAuta(data)
                },
                (error) => {
                    setIsLoadedA(true)
                    setError(error)
                    
                }
            )
        }

        function fetchKlientList() {
            getKlientApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoadedK(true)
                    setKlienci(data)
                },
                (error) => {
                    setIsLoadedK(true)
                    setError(error)
                }
            )
        }

        function handleChange(event) {
            const { name, value } = event.target
            const errorMessage = validateField(name, value)
            setErrors({
                ...errors,
                [name]: errorMessage
            })
            setWypozyczenie({
                ...wypozyczenie,
                [name]: value
            })
        }
        

        function validateField(fieldName, fieldValue) {
            let errorMessage = '';

        if (fieldName === 'klient') {     
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }}

        if (fieldName === 'auto') { 
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }}
        
            let nowDate = new Date(),
            month = '' + (nowDate.getMonth() + 1),
            day = '' + nowDate.getDate() ,
            year = nowDate.getFullYear();
        
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
                
            const nowString = [year, month, day].join('-');
        
        if (fieldName === 'data_wypozyczenia') {     
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.isYear
            } else if (!checkDateIfAfter(fieldValue, nowString)) {
                errorMessage = formValidationKeys.isFutureDate
            }}
        
        if (fieldName === 'data_zwrotu') {     
            if (fieldValue){
             if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.isYear
            } else if (!checkDateIfAfter(wypozyczenie.data_wypozyczenia, fieldValue)) {
                errorMessage = formValidationKeys.isAfterRentDate
            } else if (!checkDateIfAfter(fieldValue, nowString)) {
                errorMessage = formValidationKeys.isFutureDate
            }}}

        return errorMessage
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === formMode.NEW) {
                promise = addWypozyczenieApiCall(wypozyczenie)
            } else if (currentFormMode === formMode.EDIT) {
                promise = updateWypozyczenieApiCall(wypozyczenieId, wypozyczenie)
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
        Object.entries(wypozyczenie).forEach(([key, value]) => {
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
            navigate('/Wypozyczenie')
        }
    }, [redirect])
    
    
        const errorsSummary = hasErrors() ? t('form.validaton.messages.formErrors') : ''
        const fetchError = error ? t('list.actions.error') + `: ${error.message}` : ''
        const globalErrorMessage = errorsSummary || fetchError || message

    
        const pageTitle = currentFormMode === formMode.NEW ? t('wypozyczenie.form.add.pageTitle') : t('wypozyczenie.form.edit.pageTitle')
        const klientId = formMode.EDIT ? wypozyczenie.klient._id : ''
        const autoId = formMode.EDIT ? wypozyczenie.auto._id : ''
    
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={handleSubmit}>

                <label htmlFor="klient">{t('wypozyczenie.fields.klient')}<abbr title="required" aria-label="required">*</abbr></label>
                <select name="klient" id="klient" class={errors.klient === '' ? 'label-active' : 'error-input'} onChange={handleChange} value={klientId} >
                    <option value="">{t('wypozyczenie.form.placeholder.klient')}</option>
                    {klienci.map(klient =>
                        (<option key={klient._id} value={klient._id} label={klient.imie + " " + klient.nazwisko}></option>)
                    )}
                </select>
                <span id={errors.klient} className="errors-text">{errors.klient ? t(getValidationErrorKey(errors.klient)) : ""}</span>

                <label htmlFor="auto">{t('wypozyczenie.fields.auto')}<abbr title="required" aria-label="required">*</abbr></label>
                <select name="auto" id="auto" class={errors.auto === '' ? 'label-active' : 'error-input'} onChange={handleChange} value={autoId} >
                    <option value="">{t('wypozyczenie.form.placeholder.auto')}</option>
                    {auta.map(auto =>
                        (<option key={auto._id} value={auto._id} label={auto.producent + " " + auto.model}></option>)
                    )}
                </select>
                <span id={errors.auto} class="errors-text">{errors.auto ? t(getValidationErrorKey(errors.auto)) : ""}</span>

                    <FormInput
                        type="date"
                        label={t('wypozyczenie.fields.data_wypozyczenia')}
                        required
                        error={errors.data_wypozyczenia}
                        name="data_wypozyczenia"
                        placeholder="YYYY-MM-DD"
                        onChange={handleChange}
                        value={wypozyczenie.data_wypozyczenia ? getFormattedDate(wypozyczenie.data_wypozyczenia) : ''}
                    />

                    <FormInput
                        type="date"
                        label={t('wypozyczenie.fields.data_zwrotu')}
                        error={errors.data_zwrotu}
                        name="data_zwrotu"
                        placeholder="YYYY-MM-DD"
                        onChange={handleChange}
                        value={wypozyczenie.data_zwrotu ? getFormattedDate(wypozyczenie.data_zwrotu) : ''}
                    />

                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/Wypozyczenie"
                    />
                </form>
            </main >
        )
}

export default WypozyczenieForm