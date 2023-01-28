import React from 'react'
import { Link } from 'react-router-dom'
import { getPortfelByIdApiCall } from '../../apiCalls/portfelApiCalls'
import PortfelDetailsData from './PortfelDetailsData'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

function PortfelDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [portfel, setPortfel] = useState([])
    const [message, setMessage] = useState(null)
    const { t } = useTranslation();

    let { portfelId } = useParams()
    portfelId = parseInt(portfelId)

    function fetchPortfelDetails() {
        getPortfelByIdApiCall(portfelId)
        .then(res => res.json())
        .then(
            (data) => {
                if (data.message) {
                    setPortfel(null)
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

    useEffect(() => {
        fetchPortfelDetails()
    }, [])
    

        let content;

        if (error) {
            content = <p>{t('list.actions.error')} {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('portfel.list.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <PortfelDetailsData portfelData = {portfel} />
            console.log(portfel.klient.imie)
        }

        return (
            <main>
                <h2>{t('portfel.list.details-title')}</h2>
                    {content}
                <p><Link to="/Portfel" className="button-goback">{t('form.actions.return')}</Link></p>
            </main>
        )
}
export default PortfelDetails