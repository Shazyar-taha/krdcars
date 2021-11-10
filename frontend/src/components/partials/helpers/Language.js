/**
 * used work to with languages in frontend
 * 
 * @return {Class} : contains language functions
 */
class Language {

    /**
     * contains symbol of all included languages
     */
    static languages = ['kr', 'en']
    static classNames = ['kurdish-font', 'english-font']


    // checks cookie on initiating
    constructor() {
        // if no language selected or cookie was broken, setting language to kurdish
        if (!['kr', 'en'].includes(localStorage.getItem('language'))) {
            localStorage.setItem('language', 'kr')
        }
    }


    /**
     * checks and validates cookie language symbol
     * 
     * @return {Boolean} true if cookie language symbol is valid
     */
    static validateLanguageCookie() {
        return this.languages.includes(this.getLanguage())
    }


    /**
     * validates if a parsed symbol is valid
     * 
     * @param {String} symbol : symbol to validate
     * @return {Boolean} true if symbol is valid
     */
    static validateSymbol(symbol) {
        return this.languages.includes(symbol)
    }


    /**
     * returns cookie language symbol
     * 
     * @return {String} cookie language symbol
     */
    static getLanguage() {
        return localStorage.getItem('language')
    }


    /**
     * validates and sets parsed symbol as cookie language symbol if it was valid
     * 
     * @param {String} symbol : language symbol to set as cookie language symbol
     */
    static setLanguage(symbol) {
        if (this.validateSymbol(symbol.toLowerCase())) {
            localStorage.setItem('language', symbol.toLowerCase())
        }
    }


    /**
     * returns class name of current language font family
     * 
     * @return {String} class name of current language font family
     */
    static getClassName() {
        return this.classNames[this.languages.indexOf(this.getLanguage())]
    }
}

export default Language