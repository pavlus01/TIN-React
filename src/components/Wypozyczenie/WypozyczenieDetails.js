import React from 'react'
import { Link } from 'react-router-dom'
import { getWypozyczenieByIdApiCall } from '../../apiCalls/wypozyczenieApiCalls'
import WypozyczenieDetailsData from './WypozyczenieDetailsData'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Navigate } from "react-router-dom";
import { getCurrentUser } from '../../helpers/authHelper';


function WypozyczenieDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [wypozyczenie, setWypozyczenie] = useState([])
    const [message, setMessage] = useState(null)
    const { t } = useTranslation();

    let { wypozyczenieId } = useParams()
    wypozyczenieId = parseInt(wypozyczenieId)


    function fetchWypozyczenieDetails() {
        const userId = getCurrentUser().userId;
        console.log(userId)
        getWypozyczenieByIdApiCall(wypozyczenieId)
        .then(res => res.json())
        .then(
            (data) => {
                if (data.message) {
                    setWypozyczenie(null)
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

    useEffect(() => {
        fetchWypozyczenieDetails()
    }, [])

        let content;

        if (error) {
            content = <p>{t('list.actions.error')} {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('wypozyczenie.list.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <WypozyczenieDetailsData wypozyczenieData = {wypozyczenie} />
        }

        return (
            <main>
                <h2>{t('wypozyczenie.list.details-title')}</h2>
                    {content}
                <Link to="/Wypozyczenie" className="button-goback">{t('form.actions.return')}</Link>
            </main>
        )
}
export default WypozyczenieDetails
