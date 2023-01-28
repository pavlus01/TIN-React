import React from 'react';
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

function PortfelListTableRow(props){
    const portfel = props.portfelData
    const { t } = useTranslation();
    return(
        <tr key={portfel._id}>
                    <td>{portfel.nr_karty}</td>
                    <td>{portfel.saldo_konta}</td>
                    <td>
                        <ul className="list-actions">
                            <li><Link to={`details/${portfel._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                            <li><Link to={`edit/${portfel._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                            <li><Link to={`delete/${portfel._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                        </ul>
                    </td>
        </tr>
    )
}

export default PortfelListTableRow