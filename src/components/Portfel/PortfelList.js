import { Link } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { getPortfelApiCall } from '../../apiCalls/portfelApiCalls';
import PortfelListTable from './PortfelListTable';
import { useTranslation } from 'react-i18next';

function PortfelList (props){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [portfele, setPortfele] = useState([])
    const { t } = useTranslation();

    
   function fetchPortfelList() {
        getPortfelApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true)
                setPortfele(data)
            },
            (error) => {
                console.log(error)
                setIsLoaded(true)
                setError(error)
                
            }
        )
    }
    useEffect(() => {
        fetchPortfelList()
    }, [])
    
        let content;

        if (error) {
            content = <p>{t('list.actions.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('portfel.list.loading')}</p>
        } else {
            if (portfele.length > 0)
           content = <PortfelListTable portfelList={portfele} />
            else content = <p>{t('portfel.list.noData')}</p>
        }
    
    return(
        <main>
            <h2>{t('portfel.list.pageTitle')}</h2>
            { content }
            <p><Link to="add" className="add-button"><i>{t('portfel.list.addNew')}</i></Link></p>
        </main>
    )
    
    
};

export default PortfelList