import React from 'react'
import { deleteWypozyczenieApiCall } from '../../apiCalls/wypozyczenieApiCalls'
import {Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";

function WypozyczenieDelete() {

    const [error, setError] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [message, setMessage] = useState(null)

    let { wypozyczenieId } = useParams()
    wypozyczenieId = parseInt(wypozyczenieId)

    useEffect(() => {
        deleteWypozyczenie()
    }, [])

    function deleteWypozyczenie() {
            let promise, response;
                promise = deleteWypozyczenieApiCall(wypozyczenieId)
    
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
                    pathname: "/Wypozyczenie/",
                    }} replace={true} />
            )
        }
    
}

export default WypozyczenieDelete