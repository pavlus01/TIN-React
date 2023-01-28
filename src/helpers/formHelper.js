const fromMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    notEmpty: "notEmpty",
    len_3_25: "len_3_25",
    len_2_20: "len_2_20",
    len_2_45: "len_2_45",
    len_5_60: "len_5_60",
    len_2_4: "len_2_4",
    isNumber: "isNumber",
    is1800: "is1800",
    is100_999: "is100_999",
    is0_1: "is0_1",
    isEmail: "isEmail",
    isYear: "isYear",
    isFutureDate: "isFutureDate",
    isAfterRentDate: "isAfterRentDate",
    is18: "is18",
    formErrors: "formErrors",
    len16: "len16",
    len6: "len6",
    isAbove0: "isAbove0"
}

export function getValidationErrorKey(error) {
        return `form.validation.messages.${error}`
}


export default fromMode