/**
 * Class CountryJSON
 */
class CountryJSON {
  /**
   * Create CountryJSON from JSON Api
   * @param {JSON} json JSON from Api
   */
  constructor (json) {
    this.name = this.checkValue (json.name.common)
    this.tld = this.checkValue (json.tld)
    this.currencyName = this.parseCurrencyName (json.currencies)
    this.currencySymbol = this.parseCurrencySymbol (json.currencies)
    this.population = this.numeral (json.population)
    this.timezone = this.parseArray (json.timezones)
    this.carSide = this.checkValue (json.car.side)
    this.capital = this.parseArray (json.capital)
    this.region = this.checkValue (json.region)
    this.languages = this.parseLanguages (json.languages)
    this.coordinates = this.parseArray (json.latlng)
    this.area = this.numeral (json.area)
    this.maps = this.checkValue (json.maps.googleMaps)
    this.flag = this.checkValue(json.flags[0])
  }

  /**
   * Check defined
   * @param {string} val Variable
   * @returns {string} Variable
   * @returns {string} "-" if not defined
   */
  checkValue (val) {
    if (val === undefined)
      return '-'

    return val
  }

  /**
   * Convert string to number in spanish format
   * @param {string} num Number
   * @returns {string} Number in spanish format
   */
  numeral (num) {
    return new Intl.NumberFormat("es-ES").format(num)
  }

  /**
   * Parse currency string to string
   * @param {string[]} data JSON Api currency
   * @returns {string} List of currencies
   */
  parseCurrencyName (data) {
    var res = []

    var currency = this.checkValue (data)
    var currencyArray = Object.entries (currency)

    currencyArray.forEach(el => {
      res.push (el[1].name)
    })

    return res.join (', ')
  }

  /**
   * Join array currency symbols in string
   * @param {string[]} data JSON array currencies from Api
   * @returns {string} List of currency simbols
   */
  parseCurrencySymbol (data) {
    var res = []

    var currency = this.checkValue (data)
    var currencyArray = Object.entries (currency)

    currencyArray.forEach(el => {
      res.push (el[1].symbol)
    })

    return res.join (', ')
  }

  /**
   * Join array in string
   * @param {string[]} data JSON array from Api
   * @returns {string} List of array
   */
  parseArray (data) {
    return data.join (', ')
  }

  /**
   * Join array languages in string
   * @param {string[]} data JSON array languages from Api
   * @returns {string} List of languages
   */
  parseLanguages (data) {
    var res = []

    var languagesArray = Object.entries (data)
    if (languagesArray[0][1]) {
      res.push (languagesArray[0][1])
    }

    return res.join (', ')
  }
}
