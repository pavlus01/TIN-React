import React from 'react';
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

function AutoListTableRow(props){
    const auto = props.autoData
    const { t } = useTranslation();
    return(
        <tr key={auto._id}>
                    <td>{auto.producent}</td>
                    <td>{auto.model}</td>
                    <td>{auto.rok_produkcji}</td>
                    <td>{auto.kolor}</td>
                    <td>{auto.moc_silnika}</td>
                    <td>
                        <ul className="list-actions">
                            <li><Link to={`details/${auto._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                            <li><Link to={`edit/${auto._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                            <li><Link to={`delete/${auto._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                        </ul>
                    </td>
        </tr>
    )
}

export default AutoListTableRow