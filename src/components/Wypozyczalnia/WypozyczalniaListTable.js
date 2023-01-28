import React from 'react';
import WypozyczalniaListTableRow from './WypozyczalniaListTableRow';
import { useTranslation } from 'react-i18next';

function WypozyczalniaListTable(props){
    const wypo = props.wypoList
    const { t } = useTranslation();
    return(
            <table className="table-list" id="wypo-table">
                <thead>
                    <tr>
                        <th className="table-list-tr">{t('wypozyczalnia.fields.ulica')}</th>
                        <th className="table-list-tr">{t('wypozyczalnia.fields.numer')}</th>
                        <th className="table-list-tr">{t('wypozyczalnia.fields.kod')}</th>
                        <th className="table-list-tr">{t('wypozyczalnia.fields.miasto')}</th>
                        <th className="table-list-tr">{t('list.actions.title')}</th>
                    </tr>    
                </thead>
                <tbody>
                    {wypo.map(wypozyczalnia => 
                        <WypozyczalniaListTableRow wypoData = {wypozyczalnia} key = {wypozyczalnia._id} />
                    )}
                </tbody>
            </table>
    )
}

export default WypozyczalniaListTable