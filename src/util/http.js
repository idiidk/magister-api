import axios from 'axios'

/** A custom HTTP class for easy requests */
class HTTP {
  constructor() {
    this.cookie = ''
  }

  /**
   * Performs a GET request
   * @param {String} url 
   * @param {Object} options - Additional options to pass to Axios 
   * @returns {Promise}
   */
  static get(url, options = {}) {
    options.method = 'GET'
    return axios(url, options)

  }

  /**
   * Performs a POST request
   * @param {String} url 
   * @param {Object} options - Additional options to pass to Axios 
   * @returns {Promise}
   */
  static post(url, options = {}) {
    options.method = 'POST'
    return axios(url, options)

  }

  /**
   * Performs a PUT request
   * @param {String} url 
   * @param {Object} options - Additional options to pass to Axios 
   * @returns {Promise}
   */
  static put(url, options = {}) {
    options.method = 'PUT'
    return axios(url, options)

  }

  /**
   * Performs a DELETE request
   * @param {String} url 
   * @param {Object} options - Additional options to pass to Axios 
   * @returns {Promise}
   */
  static delete(url, options = {}) {
    options.method = 'DELETE'
    return axios(url, options)
  }
}

export default HTTP;
