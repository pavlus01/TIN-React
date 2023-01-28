import React from 'react'
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from 'react-i18next';

function WypozyczenieDetailsData(props) {
    const wypozyczenie = props.wypozyczenieData
    const wypozyczenieDateFrom = wypozyczenie.data_wypozyczenia ? getFormattedDate(wypozyczenie.data_wypozyczenia) : ""
    const wypozyczenieDateTo = wypozyczenie.data_zwrotu ? getFormattedDate(wypozyczenie.data_zwrotu) : ""
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('klient.fields.imie')}: {wypozyczenie.klient.imie}</p>
            <p>{t('klient.fields.nazwisko')}: {wypozyczenie.klient.nazwisko} </p>
            <p>{t('auto.fields.producent')}: {wypozyczenie.auto.producent} </p>
            <p>{t('auto.fields.model')}: {wypozyczenie.auto.model} </p>
            <p>{t('wypozyczenie.fields.data_wypozyczenia')}: {wypozyczenieDateFrom} </p>
            {wypozyczenieDateTo && <p>{t('wypozyczenie.fields.data_zwrotu')}: {wypozyczenieDateTo} </p>}
        </React.Fragment>
    )
}

export default WypozyczenieDetailsData