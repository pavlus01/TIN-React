import React from 'react'
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from 'react-i18next';

function KlientDetailsData(props) {
    const klient = props.klientData
    const { t } = useTranslation();
    return (
        <React.Fragment>
           <p>{t('klient.fields.imie')}: {klient.imie}</p>
            <p>{t('klient.fields.nazwisko')}: {klient.nazwisko} </p>
            <p>{t('klient.fields.email')}: {klient.email} </p>
            <p>{t('klient.fields.data_urodzenia')}: {klient.data_urodzenia ? getFormattedDate(klient.data_urodzenia) : ""} </p>
            <p>{t('klient.fields.password')}: {klient.password} </p>
            <p>{"Admin"}: {klient.admin} </p>
            
            <h2>{t('klient.form.wypozyczenia')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th className="table-list-tr">{t('auto.fields.producent')}</th>
                        <th className="table-list-tr">{t('auto.fields.model')}</th>
                        <th className="table-list-tr">{t('wypozyczenie.fields.data_wypozyczenia')}</th>
                        <th className="table-list-tr">{t('wypozyczenie.fields.data_zwrotu')}</th>
                    </tr>
                </thead>
                <tbody>
                    {klient.wypozyczenia.map(
                        wypozyczenie =>
                            <tr key={wypozyczenie._id}>
                                <td>{wypozyczenie.auto.producent}</td>
                                <td>{wypozyczenie.auto.model}</td>
                                <td>{wypozyczenie.data_wypozyczenia ? getFormattedDate(wypozyczenie.data_wypozyczenia) : ""}</td>
                                <td>{wypozyczenie.data_zwrotu ? getFormattedDate(wypozyczenie.data_zwrotu) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>

            <h2>{t('klient.form.portfele')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th className="table-list-tr">{t('portfel.fields.nr_karty')}</th>
                        <th className="table-list-tr">{t('portfel.fields.saldo_konta')}</th>
                    </tr>
                </thead>
                <tbody>
                    {klient.portfele.map(
                        portfel =>
                            <tr key={portfel._id}>
                                <td>{portfel.nr_karty}</td>
                                <td>{portfel.saldo_konta}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default KlientDetailsData