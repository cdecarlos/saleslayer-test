/**
 * Class Api restcountries.com
 */
class Api {
  /**
   * Get country data
   * @param {string} country Country name
   * @returns {JSON} Data from country
   */
  static getCountryData(country) {
    var URL_API = 'https://restcountries.com/v3/name/'
    var url = `${URL_API}${country}`

    return new Promise(function (resolve, reject) {
      let r = new XMLHttpRequest()
      r.open("GET", url, true)
      r.onreadystatechange = function () {
        if (r.status != 200) {
          showModalError()
          return false
        }

        if (r.responseText != '') {
          var res = JSON.parse(r.responseText)
          resolve (res)
        }
      }
      r.send()
    })
  }

  /**
   * Get all countries
   * @returns {JSON[]} Countries data
   */
  static getAllCountries() {
    var URL_API = 'https://restcountries.com/v3.1/all'
    var url = `${URL_API}`

    return new Promise(function (resolve, reject) {
      let r = new XMLHttpRequest()
      r.open("GET", url, true)
      r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return

        var res = JSON.parse(r.responseText)
        res.forEach(el => {
          if (el.flags && el.flags.png) el.flags = el.flags.png
        })

        resolve (res)
      }
      r.send()
    })
  }
}
