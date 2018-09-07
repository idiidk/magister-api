import HTTP from './util/http.js'
import moment from 'moment'

/** A Session object for further interaction with Magister */
class Session {
  /**
   * Initializes new Session object from tokens, usually automatically done when authenticating
   * @param {String} sessionId 
   * @param {String} bearerToken 
   */
  constructor(sessionId, bearerToken) {
    this.sessionId = sessionId
    this.bearerToken = bearerToken
    this.id = null
    this.authInject = {
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken
      }
    }
  }

  /**
   * Get the current user profile info
   * @returns {Object} - Object with user info
   */
  getProfileInfo() {
    return HTTP.get('https://baudartius.magister.net/api/account?noCache=0', this.authInject)
      .then(response => response.data)
      .then((data) => {
        this.id = data.Persoon.Id
        return data
      })
  }

  /**
   * Get all appointments from a date to a date
   * @param {Date} from 
   * @param {Date} to 
   * @returns {Object} - Object with info about appointments
   */
  getAppointments(from, to) {
    return HTTP.get(`https://baudartius.magister.net/api/personen/${this.id}/afspraken?status=1&tot=${moment(to).format("YYYY-MM-DD")}&van=${moment(from).format("YYYY-MM-DD")}`, this.authInject)
      .then(response => response.data)
  }


  /**
   * 
   * @param {String} method - HTTP request method, choose from: get, post, delete, put
   * @param {String} endpointUrl - The url of the endpoint to hit
   * @param {Object} options - Additional options to pass to Axios
   * @returns {Promise} - Return promise with body data
   */
  hitEndpoint(method, endpointUrl, options) {
    if (options.headers) {
      options.headers['Authorization'] = 'Bearer ' + this.bearerToken
    } else {
      options.headers = {
        'Authorization': 'Bearer ' + this.bearerToken
      }
    }
    return HTTP[method](endpointUrl, options)
      .then(response => response.data)
  }
}

export default Session
