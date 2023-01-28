import React from 'react'
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from 'react-i18next';

function AutoDetailsData(props) {
    const auto = props.autoData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('auto.fields.producent')}: {auto.producent}</p>
            <p>{t('auto.fields.model')}: {auto.model} </p>
            <p>{t('auto.fields.rok_produkcji')}: {auto.rok_produkcji} </p>
            <p>{t('auto.fields.kolor')}: {auto.kolor} </p>
            <p>{t('auto.fields.moc_silnika')}: {auto.moc_silnika} </p>
            <p>{t('auto.fields.wypozyczalnia')}: {auto.wypozyczalnia.miasto} </p>
            
            <h2>{t('auto.form.wypozyczenia')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th className="table-list-tr">{t('klient.fields.imie')}</th>
                        <th className="table-list-tr">{t('klient.fields.nazwisko')}</th>
                        <th className="table-list-tr">{t('wypozyczenie.fields.data_wypozyczenia')}</th>
                        <th className="table-list-tr">{t('wypozyczenie.fields.data_zwrotu')}</th>
                    </tr>
                </thead>
                <tbody>
                    {auto.wypozyczenia.map(
                        wypozyczenie =>
                            <tr key={wypozyczenie._id}>
                                <td>{wypozyczenie.klient.imie}</td>
                                <td>{wypozyczenie.klient.nazwisko}</td>
                                <td>{wypozyczenie.data_wypozyczenia ? getFormattedDate(wypozyczenie.data_wypozyczenia) : ""}</td>
                                <td>{wypozyczenie.data_zwrotu ? getFormattedDate(wypozyczenie.data_zwrotu) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default AutoDetailsData