import { getCurrentUser } from '../helpers/authHelper'
const klientBaseUrl = 'http://localhost:3000/api/klient'

export function getKlientApiCall() {
    const promise = fetch(klientBaseUrl);
    return promise;
}

export function getKlientByIdApiCall(klientId) {
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
    const url = `${klientBaseUrl}/${klientId}`;
    const promise = fetch(url, options);
    return promise;
}

export function deleteKlientApiCall(klientId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${klientBaseUrl}/${klientId}`;
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

export function addKlientApiCall(klient) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const klientString = JSON.stringify(klient)
    console.log(klientString)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: klientString
    }

    const promise = fetch(klientBaseUrl, options)
    return promise;
}

export function updateKlientApiCall(klientId, klient) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${klientBaseUrl}/${klientId}`;
    const klientString = JSON.stringify(klient)
    console.log(klientString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: klientString
    }

    const promise = fetch(url, options)
    return promise;
}