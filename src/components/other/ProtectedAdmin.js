import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../helpers/authHelper";
import { useTranslation } from 'react-i18next';

function ProtectedRoute({children}) {
    const { t } = useTranslation();
    console.log("getCurrentUser().admin")
    console.log(getCurrentUser().admin)
    console.log(getCurrentUser().admin != 'true')
    console.log(getCurrentUser().admin !== 'true')
    console.log(getCurrentUser().admin === 'true')
    console.log(getCurrentUser().admin)
    console.log("getCurrentUser().admin")
    if (!(parseInt(getCurrentUser().admin) === 1)) {
        alert(t('alter.admin'));
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoute