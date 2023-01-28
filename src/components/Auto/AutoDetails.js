import React from 'react'
import { Link } from 'react-router-dom'
import { getAutoByIdApiCall } from '../../apiCalls/autoApiCalls'
import AutoDetailsData from './AutoDetailsData'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

function AutoDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [auto, setAuto] = useState([])
    const [message, setMessage] = useState(null)
    const { t } = useTranslation();

    let { autoId } = useParams()
    autoId = parseInt(autoId)

    function fetchAutoDetails() {
        getAutoByIdApiCall(autoId)
        .then(res => res.json())
        .then(
            (data) => {
                if (data.message) {
                    setAuto(null)
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

    useEffect(() => {
        fetchAutoDetails()
    }, [])
    

        let content;

        if (error) {
            content = <p>{t('list.actions.error')} {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('auto.list.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <AutoDetailsData autoData = {auto} />
        }

        return (
            <main>
                <h2>{t('auto.list.details-title')}</h2>
                    {content}
                <p><Link to="/Auto" className="button-goback">{t('form.actions.return')}</Link></p>
            </main>
        )
}
export default AutoDetails