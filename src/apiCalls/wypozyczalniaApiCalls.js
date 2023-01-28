import { getCurrentUser } from '../helpers/authHelper'
const wypozyczalniaBaseUrl = 'http://localhost:3000/api/wypozyczalnia'

export function getWypozyczalniaApiCall() {
    const promise = fetch(wypozyczalniaBaseUrl);
    return promise;
}

export function getWypozyczalniaIdApiCall(wypozyczalniaId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
        console.log(user + " " + token)
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    const url = `${wypozyczalniaBaseUrl}/${wypozyczalniaId}`;
    const promise = fetch(url, options);
    return promise;
}

export function addWypozyczalniaApiCall(wypozyczalnia) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const wypoString = JSON.stringify(wypozyczalnia)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: wypoString
    }

    const promise = fetch(wypozyczalniaBaseUrl, options)
    return promise;
}

export function updateWypozyczalniaApiCall(wypozyczalniaId, wypozyczalnia) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${wypozyczalniaBaseUrl}/${wypozyczalniaId}`;
    const wypoString = JSON.stringify(wypozyczalnia)
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

export function deleteWypozyczalniaApiCall(wypozyczalniaId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${wypozyczalniaBaseUrl}/${wypozyczalniaId}`;
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