var store = null

var isApi = false
var isPhp = false

var debug = true // TODO delete
var loadedInfo = false

var ApiConfigSelector = '#ApiConfig'
var PhpConfigSelector = '#PHPConfig'

function getConfig() {
  store = LocalStorage.get('store')
  if (store == null) store = LocalStorage.set('store', 'Api')
  if (store == 'Api') isApi = true
  if (store == 'Php') isPhp = true
}

function init() {
  getConfig()

  initForm()

  initCheckboxOption()
}

init()
