import React from 'react';
import PortfelListTableRow from './PortfelListTableRow';
import { useTranslation } from 'react-i18next';
import { getCurrentUser } from '../../helpers/authHelper';

function PortfelListTable(props){
    const portfele = props.portfelList
    const { t } = useTranslation();
    const userId = getCurrentUser().userId;
    const isAdmin = getCurrentUser().admin;
    return(
            <table className="table-list" id="portfel-table">
                <thead>
                    <tr>
                        <th className="table-list-tr">{t('portfel.fields.nr_karty')}</th>
                        <th className="table-list-tr">{t('portfel.fields.saldo_konta')}</th>
                        <th className="table-list-tr">{t('list.actions.title')}</th>
                    </tr>    
                </thead>
                <tbody>
                    {portfele.filter(wypo => (parseInt(wypo.klient_Id) === parseInt(userId) || parseInt(isAdmin) === 1)).map(portfel => 
                        <PortfelListTableRow portfelData = {portfel} key = {portfel._id} />
                    )}
                </tbody>
            </table>
    )
}

export default PortfelListTable