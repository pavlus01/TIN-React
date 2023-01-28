import React from "react"
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import { getWypozyczeniaApiCall } from '../../apiCalls/wypozyczenieApiCalls'
import WypozyczenieListTable from './WypozyczenieListTable';
import { useTranslation } from 'react-i18next';

function WypozyczenieList(props){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [wypozyczenia, setWypozyczenia] = useState([])
    const { t } = useTranslation();
    
    function fetchWypozyczeniaList() {
        getWypozyczeniaApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true)
                setWypozyczenia(data)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    }
    useEffect(() => {
        fetchWypozyczeniaList()
    }, [])

        let content;

        if (error) {
            content = <p>{t('list.actions.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('wypozyczenie.list.loading')}</p>
        } else {
            if (wypozyczenia.length > 0)
            content = <WypozyczenieListTable wypozyczeniaList={wypozyczenia} />
            else content = <p>{t('wypozyczenie.list.noData')}</p>
        }
    
    return(
        <main>
            <h2>{t('wypozyczenie.list.pageTitle')}</h2>
            { content }
            <p><Link to="add" className="add-button"><i>{t('wypozyczenie.list.addNew')}</i></Link></p>
        </main>
    )
    
};

export default WypozyczenieList