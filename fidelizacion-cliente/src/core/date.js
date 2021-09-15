const checkDigits = (digit) => digit <= 9 ? '0' + digit : digit;

export const dateToRequestDate = (date) => {
    if(date == undefined)
        return date;
    date = new Date(date);
    return date.getUTCFullYear() + "-" + checkDigits(date.getUTCMonth() + 1) + "-" + checkDigits(date.getUTCDate());
}

export const displayDate = (date) => {
    date = new Date(date);
    return checkDigits(date.getUTCDate()) + "/" + checkDigits(date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
}

export const currentMonth = () => {
    var date = new Date();
    return (date.getUTCMonth() + 1);
}

export const currentYear = () => {
    var date = new Date();
    return date.getUTCFullYear();
}

export const today = () => {
    var date = new Date();
    return date.getFullYear() + "-" + checkDigits(parseInt(date.getUTCMonth()) + 1) + "-" + checkDigits(date.getUTCDate());
}

/**
 * Construye los query params para la consultas
 * @param {*} params : de tipo Objeto var = {a:1, b: "any"}
 */
export const buildQueryParams = (params) => {
    let queryArray = Object.keys(params).map(key => params[key] !== "" && params[key] !== undefined ? key.concat("=").concat(params[key]) : "");
    let newQueryParam = [];
    for(let i = 0 ; i<queryArray.length ; i++){
        if(queryArray[i] !== ""){
            newQueryParam.push(queryArray[i]);
        }
    }
    let queryStr = newQueryParam.join(newQueryParam.length > 1 ? "&" : "");
    return "?".concat(queryStr);
}
