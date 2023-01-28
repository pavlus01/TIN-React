import React from 'react'
import { deleteKlientApiCall } from '../../apiCalls/klientApiCalls'
import {Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";

function KlientDelete() {

    const [error, setError] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [message, setMessage] = useState(null)

    let { klientId } = useParams()
    klientId = parseInt(klientId)

    useEffect(() => {
        deleteKlient()
    }, [])

    function deleteKlient() {
            let promise, response;
                promise = deleteKlientApiCall(klientId)
    
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                setError(null)
                            } else {
                                setDeleted(true)
                            }
                        },
                        (error) => {
                            setError(error)
                            console.log(error)
                        }
                    )
            }
        }

        if (deleted) {
            return (
                <Navigate to={{
                    pathname: "/Klient/",
                    }} replace={true} />
            )
        }
    
}

export default KlientDelete