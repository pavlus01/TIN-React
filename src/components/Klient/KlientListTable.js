import React from 'react';
import KlientListTableRow from './KlientListTableRow';
import { useTranslation } from 'react-i18next';

function KlientListTable(props){
    const klienci = props.klientList
    const { t } = useTranslation();
    return(
        <table className="table-list" id="client-table">
        <thead>
            <tr>
                <th className="table-list-tr">{t('klient.fields.imie')}</th>
                <th className="table-list-tr">{t('klient.fields.nazwisko')}</th>
                <th className="table-list-tr">{t('klient.fields.email')}</th>
                <th className="table-list-tr">{t('klient.fields.data_urodzenia')}</th>
                <th className="table-list-tr">{t('list.actions.title')}</th>
            </tr>
        </thead>
            <tbody>
                {klienci.map(klient => 
                    <KlientListTableRow klientData = {klient} key = {klient._id} />
                )}
            </tbody>
        </table>
    )
}

export default KlientListTable