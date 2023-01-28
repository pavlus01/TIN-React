import React from 'react'
import { deleteAutoApiCall } from '../../apiCalls/autoApiCalls'
import {Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";

function AutoDelete() {

    const [error, setError] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [message, setMessage] = useState(null)

    let { autoId } = useParams()
    autoId = parseInt(autoId)

    useEffect(() => {
        deleteAuto()
    }, [])

    function deleteAuto() {
            let promise, response;
                promise = deleteAutoApiCall(autoId)
    
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
                    pathname: "/Auto/",
                    }} replace={true} />
            )
        }
        
    
}

export default AutoDelete