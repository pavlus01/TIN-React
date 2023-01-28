import React from 'react';
import WypozyczenieListTableRow from './WypozyczenieListTableRow';
import { useTranslation } from 'react-i18next';
import { getCurrentUser } from '../../helpers/authHelper';

function WypozyczenieListTable(props){
    const userId = getCurrentUser().userId;
    const isAdmin = getCurrentUser().admin;
    console.log(userId + " " + isAdmin)
    const wypozyczenia = props.wypozyczeniaList
    const { t } = useTranslation();

    return(
        <table className="table-list" id="wypozyczenie-table">
                <thead>
                    <tr>
                        <th className="table-list-tr">{t('klient.fields.imie')}</th>
                        <th className="table-list-tr">{t('klient.fields.nazwisko')}</th>
                        <th className="table-list-tr">{t('auto.fields.model')}</th>
                        <th className="table-list-tr">{t('wypozyczenie.fields.data_wypozyczenia')}</th>
                        <th className="table-list-tr">{t('list.actions.title')}</th>
                    </tr>    
                </thead>
            <tbody>
                {wypozyczenia.filter(wypo => (parseInt(wypo.klient._id) === parseInt(userId) || parseInt(isAdmin) === 1)).map(wypo =>
                    <WypozyczenieListTableRow wypozyczenieData = {wypo} key = {wypo._id} />
                )}
            </tbody>
        </table>
    )
}

export default WypozyczenieListTable