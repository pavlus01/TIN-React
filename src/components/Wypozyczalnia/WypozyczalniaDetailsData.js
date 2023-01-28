import React from 'react'
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from 'react-i18next';

function WypozyczalniaDetailsData(props) {
    const wypo = props.wypoData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('wypozyczalnia.fields.ulica')}: {wypo.ulica}</p>
            <p>{t('wypozyczalnia.fields.numer')}: {wypo.numer} </p>
            <p>{t('wypozyczalnia.fields.kod')}: {wypo.kod} </p>
            <p>{t('wypozyczalnia.fields.miasto')}: {wypo.miasto} </p>
            
            <h2>{t('auto.list.title')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th className="table-list-tr">{t('auto.fields.producent')}</th>
                        <th className="table-list-tr">{t('auto.fields.model')}</th>
                        <th className="table-list-tr">{t('auto.fields.rok_produkcji')}</th>
                        <th className="table-list-tr">{t('auto.fields.kolor')}</th>
                        <th className="table-list-tr">{t('auto.fields.moc_silnika')}</th>
                    </tr>
                </thead>
                <tbody>
                    {wypo.pojazdy.map(
                        auto =>
                            <tr key={auto._id}>
                                <td>{auto.producent}</td>
                                <td>{auto.model}</td>
                                <td>{auto.rok_produkcji}</td>
                                <td>{auto.kolor}</td>
                                <td>{auto.moc_silnika}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default WypozyczalniaDetailsData