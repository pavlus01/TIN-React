import { Navigate } from "react-router-dom";
import { canAlterData } from "../../helpers/authHelper";

function ProtectedRoute({children}, userId) {
    if (!canAlterData(userId)) {
        alert("Nie masz uprawnień do skorzystania z tej opcji!");
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoute