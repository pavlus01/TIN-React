import React from "react"
import { getValidationErrorKey } from '../../helpers/formHelper'
import { useTranslation } from 'react-i18next'

function FormInput(props) {
    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const error = props.error
    const errorKey = getValidationErrorKey(error)
    const { t } = useTranslation();
    const translatedErrorMessage = error ? t(errorKey) : ""


    return(
        <>
        <label htmlFor={props.name}>
            {props.label}:
            {props.required && <span className="required">*</span>}
        </label>
        <input
            type={props.type}
            className={className}
            name={props.name}
            id={props.id}
            placeholder={props.placeholder}
            defaultValue={props.value}
            onChange={props.onChange} />
            <span id={errorSpanId} className="errors-text">{translatedErrorMessage}</span>

        </>
    )
}

export default FormInput
