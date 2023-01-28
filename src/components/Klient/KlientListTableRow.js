import React from 'react';
import { Link } from "react-router-dom"
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from 'react-i18next';

function KlientListTableRow(props){
    const klient = props.klientData
    const { t } = useTranslation();
    return(
        <tr key={klient._id}>
                    <td>{klient.imie}</td>
                    <td>{klient.nazwisko}</td>
                    <td>{klient.email}</td>
                    <td>{klient.data_urodzenia ? getFormattedDate(klient.data_urodzenia) : ""}</td>
                    <td>
                        <ul className="list-actions">
                            <li><Link to={`details/${klient._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                            <li><Link to={`edit/${klient._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                            <li><Link to={`delete/${klient._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                        </ul>
                    </td>
        </tr>
    )
}

export default KlientListTableRow