import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper'


function Navigation(props) {

    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lng) => {
    console.log(lng)
    i18n.changeLanguage(lng)
}

const loginLogoutLink = isAuthenticated() ? <button onClick={props.handleLogout}>{t('auth.logout')}</button> : <Link to="/login">{t('form.actions.login')}</Link>

    return (
        <nav>
            <ol>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li><Link to="/Wypozyczalnia">{t('nav.wypozyczalnia')}</Link></li>
                    <li><Link to="/Auto">{t('nav.auto')}</Link></li>
                    <li><Link to="/Klient">{t('nav.klient')}</Link></li>
                    <li><Link to="/Wypozyczenie">{t('nav.wypozyczenie')}</Link></li>
                    <li><Link to="/Portfel">{t('klient.form.portfele')}</Link></li>
                    <li className='lang'>{loginLogoutLink}</li>
            </ol>
            <button type="button" onClick={() => handleLanguageChange('pl')}>PL</button>
            <button type="button" onClick={() => handleLanguageChange('en')}>EN</button>
            <button type="button" onClick={() => handleLanguageChange('fr')}>FR</button>
        </nav>
    )
}

export default Navigation
