/**
 * Get all country names
 * @returns {Promise}
 */
function getAllCountryNames() {
  var countries = getAllCountry()
  return new Promise(function (resolve2, reject) {
    countries.then(function (response) {
      resolve2 (response)
    })
  })
}

/**
 * Get all countries
 * @returns {Promise}
 */
function getAllCountry() {
  return new Promise(function (resolve, reject) {
    var countries = LocalStorage.getJson('countriesNames')
    if (countries !== false) {
      resolve(countries)
    } else {
      Api.getAllCountries()
        .then(function (response) {
          var countries = getCountryNames(response)
          LocalStorage.setJson('countriesNames', countries)
          resolve (countries)
        })
    }
  })
}

/**
 * Get country names
 * @param {Object[]} countries
 * @returns {string[]} Array with country names
 */
function getCountryNames(countries) {
  var res = []
  countries.forEach(country => {
    res.push (country.name.common)
  })
  res.sort()
  return res
}
