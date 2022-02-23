/**
 * LocalStorage Class
 */
class LocalStorage {
  /**
   * Get element from local storage
   * @param {string} id Index local storage
   * @returns {string}
   */
  static get(id) {
    return window.localStorage.getItem(id)
  }

  /**
   * Save value in local storage
   * @param {string} id Index local storage
   * @param {string} value Value to save
   * @returns {string}
   */
  static set(id, value) {
    window.localStorage.setItem(id, value)
    return value
  }

  /**
   * Get JSON form local storage
   * @param {string} id Index local storage
   * @returns {JSON}
   */
  static getJson(id) {
    var res = this.get(id)
    if (res === null) return false

    return JSON.parse(res)
  }

  /**
   * Save JSON on local storage
   * @param {string} id Index local storage
   * @param {JSON} value JSON from local storage
   * @returns {JSON}
   */
  static setJson(id, value) {
    value = JSON.stringify(value)
    this.set(id, value)
    return value
  }
}
