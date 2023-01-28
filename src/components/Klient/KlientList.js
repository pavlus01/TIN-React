import { Link } from 'react-router-dom'
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { getKlientApiCall } from '../../apiCalls/klientApiCalls'
import KlientListTable from './KlientListTable';
import { useTranslation } from 'react-i18next';

function KlientList(props) {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [klienci, setKlienci] = useState([])
    const { t } = useTranslation();
    
    function fetchKlientList() {
        getKlientApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true)
                setKlienci(data)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    }
    useEffect(() => {
        fetchKlientList()
    }, [])

    
        let content;

        if (error) {
            content = <p>{t('list.actions.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('klient.list.loading')}</p>
        } else {
            if (klienci.length > 0)
            content = <KlientListTable klientList={klienci} />
            else content = <p>{t('klient.list.noData')}</p>
        }
    
    return(
        <main>
            <h2>{t('klient.list.pageTitle')}</h2>
            { content }
            <p><Link to="add" className="add-button"><i>{t('klient.list.addNew')}</i></Link></p>
        </main>
    )
    
    
};

export default KlientList