import { useTranslation } from 'react-i18next';

function MainContent() {

    const { t, i18n } = useTranslation();
    return (
        <main>
            <h2>{t('main-page.content')}</h2>
            <p class="company-details">
            {t('main-page.text')}
            </p>
        </main>
        )
    }
        
export default MainContent