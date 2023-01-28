import { Link } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { getAutoApiCall } from '../../apiCalls/autoApiCalls';
import AutoListTable from './AutoListTable';
import { useTranslation } from 'react-i18next';

function AutoList (props){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [auta, setAuta] = useState([])
    const { t } = useTranslation();

    
   function fetchAutoList() {
        getAutoApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true)
                setAuta(data)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
                
            }
        )
    }
    useEffect(() => {
        fetchAutoList()
    }, [])
    
        let content;

        if (error) {
            content = <p>{t('list.actions.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('auto.list.loading')}</p>
        } else {
            if (auta.length > 0)
            content = <AutoListTable autaList={auta} />
            else content = <p>{t('auto.list.noData')}</p>
        }
    
    return(
        <main>
            <h2>{t('auto.list.pageTitle')}</h2>
            { content }
            <p><Link to="add" className="add-button"><i>{t('auto.list.addNew')}</i></Link></p>
        </main>
    )
    
    
};

export default AutoList