// valid language symbols
const languages = ['kr', 'en']

// each language font classname
const classNames = ['kurdish-font', 'english-font']



/**
 * validates if a parsed symbol is valid
 * 
 * @param {String} symbol : symbol to validate
 * 
 * @return {Boolean} true if symbol is valid
 */
function validateSymbol(symbol) {
    return languages.includes(symbol)
}



/**
 * validates language cookie or creates new one if not defined before
 */
function initLanguage() {
    if (!validateSymbol(getLanguage())) {
        localStorage.setItem('language', 'kr')
    }
}



/**
 * returns language cookie symbol
 * 
 * @return {String} cookie language symbol
 */
function getLanguage() {
    return localStorage.getItem('language')
}



/**
 * returns font class name of current language
 * 
 * @return {String} font class name of current language
 */
function getClassName() {
    return classNames[languages.indexOf(getLanguage())]
}



/**
 * validates and sets parsed symbol as language cookie symbol if it was valid
 * 
 * @param {String} symbol : language symbol to set as language cookie symbol
 */
function setLanguage(symbol) {
    if (validateSymbol(symbol.toLowerCase())) {
        localStorage.setItem('language', symbol.toLowerCase())
    }
}



export { getLanguage, getClassName, setLanguage, initLanguage }