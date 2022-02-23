/**
 * Show country info block removing hide class
 * @returns {void}
 */
function showCountryInfo() {
  var countryInfo = $('#countryInfo')
  if (countryInfo.length > 0) {
    countryInfo.removeClass ('hide')
  }
}

/**
 * Hide country info block adding hide class
 * @returns {void}
 */
function hideCountryInfo() {
  var countryInfo = $('#countryInfo')
  if (countryInfo.length > 0) {
    countryInfo.addClass ('hide')
  }
}

/**
 * Show loading spinner
 * @returns {void}
 */
function showLoading(text) {
  var loading = $('#loading')
  if (loading.length > 0) {
    loading.removeClass('hide')
    $('#loading #text').html(text)
  }
}

/**
 * Hide loading spinner
 * @returns {void}
 */
function hideLoading() {
  var loading = $('#loading')
  if (loading.length > 0) {
    loading.addClass('hide')
    $('#loading #text').html('')
  }
}

/**
 * Change data Country with CountryJSON Object
 * @param {CountryJSON} country
 * @returns {void}
 */
function completeInfo(country) {
  var name = $('#name')
  if (name.length > 0) name.text(country.name)

  var tld = $('#tld')
  if (tld.length > 0) tld.text(country.tld)

  var currencyName = $('#currencyName')
  if (currencyName.length > 0) currencyName.text(country.currencyName)

  var currencySymbol = $('#currencySymbol')
  if (currencySymbol.length > 0) currencySymbol.text(country.currencySymbol)

  var population = $('#population')
  if (population.length > 0) population.text(country.population)

  var timezone = $('#timezone')
  if (timezone.length > 0) timezone.text(country.timezone)

  var carSide = $('#carSide')
  if (carSide.length > 0) carSide.text(country.carSide)

  var capital = $('#capital')
  if (capital.length > 0) capital.text(country.capital)

  var region = $('#region')
  if (region.length > 0) region.text(country.region)

  var languages = $('#languages')
  if (languages.length > 0) languages.text(country.languages)

  var coordinates = $('#coordinates')
  if (coordinates.length > 0) coordinates.text(country.coordinates)

  var area = $('#area')
  if (area.length > 0) area.text(country.area)

  var maps = $('#urlMaps')
  if (maps.length > 0) maps.attr('href', country.maps)

  var flag = $('#flag')
  if (flag.length > 0) {
    flag.attr('src', country.flag)
    flag.attr('alt', country.name)
  }

  showCountryInfo()
}

/**
 * Search country info
 * @returns {void}
 */
function searchCountry() {
  showLoading('Loading country')
  hideCountryInfo()

  var input = $('#inputSearch')
  if (input.length > 0) {
    getCountryInfo(input.val())
      .then(function (response) {
        completeInfo(response)
        hideLoading()
      })
  }
}

/**
 * Get country info
 * @param {string} name
 * @returns {Promise}
 */
function getCountryInfo(name) {
  var countries = LocalStorage.getJson('countries')
  if (!countries) countries = {}

  return new Promise(function (resolve, reject) {
    loadedInfo = false
    if (countries[name] !== undefined) {
      var countryJSON = new CountryJSON (countries[name])
      resolve(countryJSON)
    } else {
      Api.getCountryData (name)
        .then(function (response) {
          if (response[0]) {
            loadedInfo = true
            countries[name] = response[0]
            LocalStorage.setJson('countries', countries)

            var countryJSON = new CountryJSON (response[0])
            resolve(countryJSON)
          }
        })
    }
  })
}

/**
 * Init form with prepare select
 * @returns {void}
 */
function initForm() {
  showLoading('Loading country names')
  getAllCountryNames()
    .then(function (names) {
      prepareSelect(names)
      hideLoading()
    })
}

/**
 * Prepare select
 * @param {string[]} names Array with names for select
 * @returns {void}
 */
function prepareSelect(names) {
  var input = $('#inputSearch')
  if (input.length == 0) return false

  createDatalist(names)
  addListenerInput(input)
}

/**
 * Create datalist
 * @param {string[]} names Array with names for datalist
 * @returns {void}
 */
function createDatalist(names) {
  var datalistDOM = $('#listCountries')
  if (datalistDOM.length > 0) return false
  console.log({names})
  console.log({datalistDOM})

  var datalist = document.createElement('datalist')
  datalist.id = 'listCountries'

  names.forEach(name => {
    var option = document.createElement('option')
    option.value = name
    datalist.appendChild(option)
  })

  document.body.appendChild(datalist)
}

/**
 * Add event listener to input
 * @param {InputDOM} input Input DOM element
 * @returns {void}
 */
function addListenerInput(input) {
  input.change(function () {
    searchCountry()
  })
}

// TODO Docs
function showModalError() {
  if (!loadedInfo) {
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: 'No se ha encontrado pais',
    })
  }
  hideLoading()
}

// TODO Docs
function saveAllCountryData() {
  var countries = {}
  var countriesPromise = Api.getAllCountries()
  countriesPromise.then(function (response) {
    response.forEach(el => {
      if (el.name.common) {
        countries[el.name.common] = el
      }
    })

    LocalStorage.setJson('countries', countries)
  })
}
