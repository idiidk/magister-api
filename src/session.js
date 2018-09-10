import HTTP from './util/http.js'
import moment from 'moment'

import Group from './types/Group.js'
import Appointment from './types/Appointment.js'
import Person from './types/Person.js'

import Message from './chainables/Message'

/** A Session object for further interaction with Magister */
class Session {
  /**
   * Initializes new Session object from tokens, usually automatically done when authenticating
   * @param {String} sessionId - The current sessionId
   * @param {String} bearerToken - The current bearerToken
   * @param {String} schoolUrl - The url of the currently connected school
   */
  constructor(sessionId, bearerToken, schoolUrl) {
    this.sessionId = sessionId
    this.bearerToken = bearerToken
    this.schoolUrl = schoolUrl
    this.id = null

    this.Message = Message.bind(null, this)
  }

  /**
   * Get the current user profile info
   * @returns {Object} - Object with user info
   */
  getProfileInfo() {
    return this.hitEndpoint('GET', `${this.schoolUrl}/api/account?noCache=0`)
      .then((data) => {
        this.id = data.Persoon.Id
        return new Person(data.Persoon)
      })
  }

  /**
   * Get all appointments from a date to a date
   * @param {Date} from - Starting date
   * @param {Date} to - Ending date
   * @returns {Object} - Object with info about appointments
   */
  getAppointments(from, to) {
    return this.hitEndpoint('GET', `${this.schoolUrl}/api/personen/${this.id}/afspraken?status=1&tot=${moment(to).format("YYYY-MM-DD")}&van=${moment(from).format("YYYY-MM-DD")}`)
      .then(data => {
        const appointments = [];
        for (let i = 0; i < data.Items.length; i++) {
          appointments.push(new Appointment(data.Items[i]))
        }

        return appointments
      })
  }

  /**
   * Get all groups (classes) a user has ever been in
   * @returns {Array<Group>} - Array containing group objects
   */
  getGroups() {
    return this.hitEndpoint('GET', `${this.schoolUrl}/api/personen/${this.id}/aanmeldingen?geenToekomstige=false`)
      .then(data => {
        const groups = [];
        for (let i = 0; i < data.Items.length; i++) {
          groups.push(new Group(data.Items[i]))
        }

        return groups
      })
  }

  /**
   * @param {String} method - HTTP request method, choose from: get, post, delete, put
   * @param {String} endpointUrl - The url of the endpoint to hit
   * @param {Object} options - Additional options to pass to Axios
   * @returns {Promise<Object>} - Promise with body data
   */
  hitEndpoint(method = 'GET', endpointUrl, options = {}) {
    if (options.headers) {
      options.headers['Authorization'] = 'Bearer ' + this.bearerToken
    } else {
      options.headers = {
        'Authorization': 'Bearer ' + this.bearerToken
      }
    }
    return HTTP[method.toLowerCase()](endpointUrl, options)
      .then(response => response.data)
  }
}

export default Session
