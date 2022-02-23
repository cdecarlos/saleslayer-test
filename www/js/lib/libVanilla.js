/**
 * Selector similar jQuery
 * @param {string} selector selector (.class or #id)
 * @returns {DOM[]} Array elements
 * @returns {DOM} Element
 * @returns {false} Not found
 */
function s(selector) {
  var elements = document.querySelectorAll (selector)
  if (elements.length === 1)
    return elements[0]
  if (elements.length === 0)
    return false

  return elements
}

/**
 * Show country info block removing hide class
 * @returns {void}
 */
function showCountryInfo() {
  var countryInfo = s('#countryInfo')
  if (countryInfo) {
    countryInfo.classList.remove ('hide')
  }
}

/**
 * Hide country info block adding hide class
 * @returns {void}
 */
function hideCountryInfo() {
  var countryInfo = s('#countryInfo')
  if (countryInfo) {
    countryInfo.classList.add ('hide')
  }
}

/**
 * Show loading spinner
 * @returns {void}
 */
function showLoading(text) {
  var loading = s('#loading')
  if (loading) {
    loading.classList.remove('hide')
    loading.querySelector('#text').innerHTML = text
  }
}

/**
 * Hide loading spinner
 * @returns {void}
 */
function hideLoading() {
  var loading = s('#loading')
  if (loading) {
    loading.classList.add('hide')
    loading.querySelector('#text').innerHTML = ''
  }
}

/**
 * Change data Country with CountryJSON Object
 * @param {CountryJSON} country
 * @returns {void}
 */
function completeInfo(country) {
  var name = s('#name')
  if (name) name.innerHTML = country.name

  var tld = s('#tld')
  if (tld) tld.innerHTML = country.tld

  var currencyName = s('#currencyName')
  if (currencyName) currencyName.innerHTML = country.currencyName

  var currencySymbol = s('#currencySymbol')
  if (currencySymbol) currencySymbol.innerHTML = country.currencySymbol

  var population = s('#population')
  if (population) population.innerHTML = country.population

  var timezone = s('#timezone')
  if (timezone) timezone.innerHTML = country.timezone

  var carSide = s('#carSide')
  if (carSide) carSide.innerHTML = country.carSide

  var capital = s('#capital')
  if (capital) capital.innerHTML = country.capital

  var region = s('#region')
  if (region) region.innerHTML = country.region

  var languages = s('#languages')
  if (languages) languages.innerHTML = country.languages

  var coordinates = s('#coordinates')
  if (coordinates) coordinates.innerHTML = country.coordinates

  var area = s('#area')
  if (area) area.innerHTML = country.area

  var maps = s('#urlMaps')
  if (maps) maps.href = country.maps

  var flag = s('#flag')
  if (flag) {
    flag.src = country.flag
    flag.alt = country.name
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

  var input = s('#inputSearch')
  if (input) {
    getCountryInfo(input.value)
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
  var countries = {}
  if (!isPhp) {
    var countries = LocalStorage.getJson('countries')
  }
  if (!countries) countries = {}

  return new Promise(function (resolve, reject) {
    loadedInfo = false
    if (countries[name] !== undefined) {
      var countryJSON = new CountryJSON (countries[name])
      resolve(countryJSON)
    } else {
      if (isPhp) {
        ApiPhp.getCountryData (name)
          .then(function (response) {
            console.log({response})
            if (response) {
              loadedInfo = true
              countries[name] = response.name
              LocalStorage.setJson('countries', countries)

              var countryJSON = new CountryJSON (response)
              resolve(countryJSON)
            }
          })

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
  var input = s('#inputSearch')
  if (!input) return false

  createDatalist(names)
  addListenerInput(input)
}

/**
 * Create datalist
 * @param {string[]} names Array with names for datalist
 * @returns {void}
 */
function createDatalist(names) {
  var datalistDOM = s('#listCountries')
  if (datalistDOM) return false

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
  input.addEventListener('change', function (e) {
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

// TODO Docs
function saveAllCountryDataPhp() {
  var countries = {}
  var countriesPromise = Api.getAllCountries()
  countriesPromise.then(function (response) {
    response.forEach(el => {
      if (el.name.common) {
        countries[el.name.common] = el
      }
    })

    Object.entries(countries).forEach(entry => {
      const [name, json] = entry;

      ApiPhp.saveCountry(name, json);
    })
  })
}

// TODO docs
function disableAllOptions() {
  var apiConfig = s(ApiConfigSelector)
  if (apiConfig && apiConfig.checked) apiConfig.checked = false
  // isApi = false

  var phpConfig = s(PhpConfigSelector)
  if (phpConfig && phpConfig.checked) phpConfig.checked = false
  // isPhp = false

}

// TODO docs
function enableOption(value) {
  disableAllOptions()
  value.checked = true

  switch (value.id) {
    case 'ApiConfig':
      saveAllCountryData()
      LocalStorage.set('store', 'Api')
      isApi = true
      break;
    case 'PHPConfig':
      saveAllCountryDataPhp()
      LocalStorage.set('store', 'Php')
      isPhp = true
      break;
  }
}

// TODO docs
function initCheckboxOption() {
  var apiConfig = s(ApiConfigSelector)
  var phpConfig = s(PhpConfigSelector)
  if (apiConfig && phpConfig) {
    disableAllOptions()
    var store = LocalStorage.get('store')
    switch (store) {
      case 'Api':
        idApi = true
        apiConfig.checked = true
        break;
      case 'Php':
        idPhp = true
        phpConfig.checked = true
        break;
    }
  }
}
