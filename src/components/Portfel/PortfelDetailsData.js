import React from 'react'
import { useTranslation } from 'react-i18next';

function PortfelDetailsData(props) {
    const portfel = props.portfelData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('klient.fields.imie')}: {portfel.klient.imie}</p>
            <p>{t('klient.fields.nazwisko')}: {portfel.klient.nazwisko} </p>
            <p>{t('klient.fields.email')}: {portfel.klient.email} </p>
            <p>{t('portfel.fields.nr_karty')}: {portfel.nr_karty} </p>
            <p>{t('portfel.fields.saldo_konta')}: {portfel.saldo_konta} </p>
            
        </React.Fragment>
    )
}

export default PortfelDetailsData