/** A Subject object for further interaction with subjects 
 * @memberof Session
 * @prop {String} code - The shorthand of the subject
 * @prop {String} description - Full name
 */
class Subject {
  /**
   * Initializes new Subject object from a raw data object
   * @param {Object} rawData - The raw data directly parsed from JSON
   */
  constructor(rawData) {
    this.rawData = rawData

    this.code = rawData.code;
    this.description = rawData.description;
  }
}

export default Subject
