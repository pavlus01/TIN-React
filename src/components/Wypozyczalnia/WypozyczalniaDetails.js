import React from 'react'
import { Link } from 'react-router-dom'
import { getWypozyczalniaIdApiCall } from '../../apiCalls/wypozyczalniaApiCalls'
import WypozyczalniaDetailsData from './WypozyczalniaDetailsData'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

function  WypozyczalniaDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [wypozyczalnia, setWypozyczalnia] = useState([])
    const [message, setMessage] = useState(null)
    const { t } = useTranslation();

    let { wypozyczalniaId } = useParams()
    wypozyczalniaId = parseInt(wypozyczalniaId)

    function fetchWypozyczalniaDetails() {
        getWypozyczalniaIdApiCall(wypozyczalniaId)
        .then(res => res.json())
        .then(
            (data) => {
                if (data.message) {
                    setWypozyczalnia(null)
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
        fetchWypozyczalniaDetails()
    }, [])
    

        let content;

        if (error) {
            content = <p>{t('list.actions.error')} {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('wypozyczalnia.list.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <WypozyczalniaDetailsData wypoData = {wypozyczalnia} />
        }

        return (
            <main>
                <h2>{t('wypozyczalnia.list.details-title')}</h2>
                    {content}
                <p><Link to="/Wypozyczalnia" className="button-goback">{t('form.actions.return')}</Link></p>
            </main>
        )
}
export default WypozyczalniaDetails