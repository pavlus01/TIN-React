import { getCurrentUser } from '../helpers/authHelper'
const autoBaseUrl = 'http://localhost:3000/api/auta'

export function getAutoApiCall() {
    const promise = fetch(autoBaseUrl);
    return promise;
}

export function getAutoByIdApiCall(autoId) {
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
    const url = `${autoBaseUrl}/${autoId}`;
    const promise = fetch(url, options);
    return promise;
}

export function addAutoApiCall(auto) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const autoString = JSON.stringify(auto)
    console.log(autoString)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: autoString
    }

    const promise = fetch(autoBaseUrl, options)
    return promise;
}

export function updateAutoApiCall(autoId, auto) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${autoBaseUrl}/${autoId}`;
    const autoString = JSON.stringify(auto)
    console.log(autoString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: autoString
    }

    const promise = fetch(url, options)
    return promise;
}

export function deleteAutoApiCall(autoId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${autoBaseUrl}/${autoId}`;
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