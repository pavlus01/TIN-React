import React from 'react'
import { Link } from 'react-router-dom'
import { getKlientByIdApiCall } from '../../apiCalls/klientApiCalls'
import KlientDetailsData from './KlientDetailsData'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';


function KlientDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [klient, setKlient] = useState([])
    const [message, setMessage] = useState(null)
    const { t } = useTranslation();

    let { klientId } = useParams()
    klientId = parseInt(klientId)


    function fetchKlientDetails() {
        getKlientByIdApiCall(klientId)
        .then(res => res.json())
        .then(
            (data) => {
                if (data.message) {
                    setKlient(null)
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
        fetchKlientDetails()
    }, [])

        let content;

        if (error) {
            content = <p>{t('list.actions.error')} {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('klient.list.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <KlientDetailsData klientData = {klient} />
        }

        return (
            <main>
                <h2>{t('klient.list.details-title')}</h2>
                    {content}
                <p><Link to="/Klient" className="button-goback">{t('form.actions.return')}</Link></p>
            </main>
        )
}
export default KlientDetails