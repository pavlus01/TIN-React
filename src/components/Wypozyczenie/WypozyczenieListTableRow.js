import React from 'react';
import { Link } from "react-router-dom"
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from 'react-i18next';

function WypozyczenieListTableRow(props){
    const wypozyczenie = props.wypozyczenieData
    const { t } = useTranslation();
    return(
        <tr key={wypozyczenie._id}>
                            <td>{wypozyczenie.klient.imie}</td>
                            <td>{wypozyczenie.klient.nazwisko}</td>
                            <td>{wypozyczenie.auto.model}</td>
                            <td>{wypozyczenie.data_wypozyczenia ? getFormattedDate(wypozyczenie.data_wypozyczenia) : ""}</td>
                            <td>
                                <ul className="list-actions">
                                    <li><Link to={`details/${wypozyczenie._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                                    <li><Link to={`edit/${wypozyczenie._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                                    <li><Link to={`delete/${wypozyczenie._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                                </ul>
                            </td>
        </tr>
    )
}

export default WypozyczenieListTableRow