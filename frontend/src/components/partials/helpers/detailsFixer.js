/**
 * parse details object to array based on their keys
 * 
 * NOTE: skips name property by default
 * 
 * @param {Object} details : details object
 * @param {Boolean} skipKeys : the keys that will be skipped, contains 'name' key by default
 * @param {Boolean} keyPrefix : prefix text for each key
 * @param {Boolean} fixDate : determines if the dates should be fixed or not
 * 
 * @return {Array} : an object with details array
 */
export default function DetailsFixer(details, keyPrefix = '', skipKeys = ['name'], fixDate = true) {

    // details array
    let detailsArray = [];

    // looping through the details object
    for (let key in details) {

        // skip name property if skipname is true
        if (skipKeys.includes(key)) {
            continue;
        }

        // push the details to details array
        detailsArray.push({
            key: keyPrefix + key,
            value: fixDate ? fixDateString(details[key]) : details[key],
            // if the value was an object, then it is not a single value
            singleValue: typeof details[key] === 'object' ? false : true
        });

        // deleting the key from details object
        delete details[key]
    }

    // adding the details array to the details object
    details = {
        ...details,
        details: detailsArray
    }

    return details;
}



/**
 * checks if a string is valid date or not
 * 
 * @param {String} date : date string
 * 
 * @return {Boolean} : true if valid date, false otherwise
 */
const isDate = (date) => {
    if (typeof date === 'string')
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
    else
        return false;
}



/**
 * fixes date string
 * 
 * @param {String} date : date string
 * 
 * @return {string} : local string of the fixed date
 */
const fixDateString = (date) => {
    return isDate(date) ? new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' }) : date;
}