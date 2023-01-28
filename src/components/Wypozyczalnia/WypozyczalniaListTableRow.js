import React from 'react';
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

function WypozyczalniaListTableRow(props){
    const wypo = props.wypoData
    const { t } = useTranslation();
    return(
        <tr key={wypo._id}>
                    <td>{wypo.ulica}</td>
                    <td>{wypo.numer}</td>
                    <td>{wypo.kod}</td>
                    <td>{wypo.miasto}</td>
                    <td>
                        <ul className="list-actions">
                            <li><Link to={`details/${wypo._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                            <li><Link to={`edit/${wypo._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                            <li><Link to={`delete/${wypo._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                        </ul>
                    </td>
        </tr>
    )
}

export default WypozyczalniaListTableRow