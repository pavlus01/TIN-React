import React from 'react'
import { deletePortfelApiCall } from '../../apiCalls/portfelApiCalls'
import {Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";

function PortfelDelete() {

    const [error, setError] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [message, setMessage] = useState(null)

    let { portfelId } = useParams()
    portfelId = parseInt(portfelId)

    useEffect(() => {
        deletePortfel()
    }, [])

    function deletePortfel() {
            let promise, response;
                promise = deletePortfelApiCall(portfelId)
    
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
                    pathname: "/Portfel/",
                    }} replace={true} />
            )
        }
    
}

export default PortfelDelete