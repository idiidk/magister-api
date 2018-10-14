import HTTP from "./util/http.js";
import moment from "moment";

import Group from "./types/Group.js";
import Appointment from "./types/Appointment.js";
import Person from "./types/Person.js";
import Grade from "./types/Grade.js";

import Message from "./chainables/Message";

/** A Session object for further interaction with Magister */
class Session {
  /**
   * Initializes new Session object from tokens, usually automatically done when authenticating
   * @param {String} sessionId - The current sessionId
   * @param {String} bearerToken - The current bearerToken
   * @param {String} schoolUrl - The url of the currently connected school
   */
  constructor(sessionId, bearerToken, schoolUrl) {
    this.sessionId = sessionId;
    this.bearerToken = bearerToken;
    this.schoolUrl = schoolUrl;
    this.id;
    this.current;

    this.Message = Message.bind(null, this);
  }

  async initialize() {
    await this.getProfileInfo();
    return this.getCurrentSession();
  }

  /**
   * Get the current user profile info
   * @returns {Promise<Person>} - Object with user info
   */
  async getProfileInfo() {
    const data = await this.hitEndpoint(
      "GET",
      `${this.schoolUrl}/api/account?noCache=0`
    );
    this.id = data.Persoon.Id;
    return new Person(data.Persoon);
  }

  /**
   * Updates current object containing url's
   * @returns {Promise}
   */
  async getCurrentSession() {
    const data = await this.hitEndpoint(
      "GET",
      `${this.schoolUrl}/api/sessions/current`
    );
    this.current = data
  }

  /**
   * Get grades in current year
   * @param {Number} amount - Amount of grades
   * @param {Number} skip - Gades to skip
   * @returns {Promise<Array>} - Array containing grades
   */
  async getGrades(amount, skip) {
    const data = await this.hitEndpoint(
      "GET",
      `${this.schoolUrl}/api/personen/${
        this.id
      }/cijfers/laatste?top=${amount}&skip=${skip}}`
    )
    const grades = [];
    for (let i = 0; i < data.items.length; i++) {
      grades.push(new Grade(data.items[i]));
    }

    return grades;
  }

  /**
   * Get all appointments from a date to a date
   * @param {Date} from - Starting date
   * @param {Date} to - Ending date
   * @returns {Promise<Array>} - Array containing appointments
   */
  async getAppointments(from, to) {
    const data = await this.hitEndpoint(
      "GET",
      `${this.schoolUrl}/api/personen/${
        this.id
      }/afspraken?status=1&tot=${moment(to).format("YYYY-MM-DD")}&van=${moment(
        from
      ).format("YYYY-MM-DD")}`
    )
    const appointments = [];
    for (let i = 0; i < data.Items.length; i++) {
      appointments.push(new Appointment(data.Items[i]));
    }

    return appointments;
  }

  /**
   * Get all groups (classes) a user has ever been in
   * @returns {Promise<Array<Group>>} - Array containing group objects
   */
  async getGroups() {
    const data = await this.hitEndpoint(
      "GET",
      `${this.schoolUrl}/api/personen/${
        this.id
      }/aanmeldingen?geenToekomstige=false`
    )
    const groups = [];
    for (let i = 0; i < data.Items.length; i++) {
      groups.push(new Group(data.Items[i]));
    }

    return groups;
  }

  /**
   * Returns session data that can be used to reauthenticate later
   * @returns {String}
   */

  saveAuth() {
    const data = {
      sessionId: this.sessionId,
      bearerToken: this.bearerToken,
      schoolUrl: this.schoolUrl
    }

    return JSON.stringify(data);
  }

  /**
   * @param {String} method - HTTP request method, choose from: get, post, delete, put
   * @param {String} endpointUrl - The url of the endpoint to hit
   * @param {Object} options - Additional options to pass to Axios
   * @returns {Promise<Object>} - Promise with body data
   */
  hitEndpoint(method = "GET", endpointUrl, options = {}) {
    if (options.headers) {
      options.headers["Authorization"] = "Bearer " + this.bearerToken;
    } else {
      options.headers = {
        Authorization: "Bearer " + this.bearerToken
      };
    }
    return HTTP[method.toLowerCase()](endpointUrl, options).then(
      response => response.data
    );
  }
}

export default Session;
