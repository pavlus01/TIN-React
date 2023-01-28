import { Link } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { getWypozyczalniaApiCall } from '../../apiCalls/wypozyczalniaApiCalls';
import WypozyczalniaListTable from './WypozyczalniaListTable';
import { useTranslation } from 'react-i18next';

function WypozyczalniaList (props){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [wypozyczalnie, setWypozyczalnie] = useState([])
    const { t } = useTranslation();

    
   function fetchWypozyczalnieList() {
        getWypozyczalniaApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true)
                setWypozyczalnie(data)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
                
            }
        )
    }
    useEffect(() => {
        fetchWypozyczalnieList()
    }, [])
    
        let content;

        if (error) {
            content = <p>{t('list.actions.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('wypozyczalnia.list.loading')}</p>
        } else {
            if (wypozyczalnie.length > 0)
            content = <WypozyczalniaListTable wypoList={wypozyczalnie} />
            else content = <p>{t('wypozyczalnia.list.noData')}</p>
        }
    
    return(
        <main>
            <h2>{t('wypozyczalnia.list.pageTitle')}</h2>
            { content }
            <p><Link to="add" className="add-button"><i>{t('wypozyczalnia.list.addNew')}</i></Link></p>
        </main>
    )
    
    
};

export default WypozyczalniaList