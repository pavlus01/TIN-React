import { getCurrentUser } from '../helpers/authHelper'
const wypozyczenieBaseUrl = 'http://localhost:3000/api/wypozyczenie'

export function getWypozyczeniaApiCall() {
    const promise = fetch(wypozyczenieBaseUrl);
    return promise;
}

export function getWypozyczenieByIdApiCall(wypozyczenieId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    const url = `${wypozyczenieBaseUrl}/${wypozyczenieId}`;
    const promise = fetch(url, options);
    return promise;
}

export function deleteWypozyczenieApiCall(wypozyczenieId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${wypozyczenieBaseUrl}/${wypozyczenieId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    
    const promise = fetch(url, options)
    return promise;
}

export function addWypozyczenieApiCall(wypozyczenie) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const wypoString = JSON.stringify(wypozyczenie)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: wypoString
    }

    const promise = fetch(wypozyczenieBaseUrl, options)
    return promise;
}

export function updateWypozyczenieApiCall(wypozyczenieId, wypozyczenie) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${wypozyczenieBaseUrl}/${wypozyczenieId}`;
    const wypoString = JSON.stringify(wypozyczenie)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: wypoString
    }

    const promise = fetch(url, options)
    return promise;
}
