import React from 'react';
import AutoListTableRow from './AutoListTableRow';
import { useTranslation } from 'react-i18next';

function AutoListTable(props){
    const auta = props.autaList
    const { t } = useTranslation();
    return(
            <table className="table-list" id="auta-table">
                <thead>
                    <tr>
                        <th className="table-list-tr">{t('auto.fields.producent')}</th>
                        <th className="table-list-tr">{t('auto.fields.model')}</th>
                        <th className="table-list-tr">{t('auto.fields.rok_produkcji')}</th>
                        <th className="table-list-tr">{t('auto.fields.kolor')}</th>
                        <th className="table-list-tr">{t('auto.fields.moc_silnika')}</th>
                        <th className="table-list-tr">{t('list.actions.title')}</th>
                    </tr>    
                </thead>
                <tbody>
                    {auta.map(auto => 
                        <AutoListTableRow autoData = {auto} key = {auto._id} />
                    )}
                </tbody>
            </table>
    )
}

export default AutoListTable