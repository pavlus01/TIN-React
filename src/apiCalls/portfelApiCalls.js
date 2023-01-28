import { getCurrentUser } from '../helpers/authHelper'
const portfelBaseUrl = 'http://localhost:3000/api/portfel'

export function getPortfelApiCall() {
    const promise = fetch(portfelBaseUrl);
    return promise;
}

export function getPortfelByIdApiCall(portfelId) {
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
    const url = `${portfelBaseUrl}/${portfelId}`;
    const promise = fetch(url, options);
    return promise;
}

export function addPortfelApiCall(portfel) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const portfelString = JSON.stringify(portfel)
    console.log(portfelString)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: portfelString
    }

    const promise = fetch(portfelBaseUrl, options)
    return promise;
}

export function updatePortfelApiCall(portfelId, portfel) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${portfelBaseUrl}/${portfelId}`;
    const portfelString = JSON.stringify(portfel)
    console.log(portfelString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: portfelString
    }

    const promise = fetch(url, options)
    return promise;
}

export function deletePortfelApiCall(portfelId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${portfelBaseUrl}/${portfelId}`;
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