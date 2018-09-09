/** A group object for futher interaction with groups 
 * @memberof Session
 * @prop {Number} id - The id of the group
 * @prop {String} description - The description of the group
 * @prop {Date} startDate - The date the group period started
 * @prop {Date} endDate - The date the group period ended
 * @prop {Object} study - The object containing information about the current study type
 * @prop {String} studyPeriod - The id of the group period
 * @prop {String} mainProfile - The name of the current main study profile
 * @prop {String} secondaryProfile - The name of the current secondary study profile
 */
class Group {
  /**
   * Initializes new Group object from a raw data object
   * @param {Object} rawData - The raw group data directly parsed from JSON
   */
  constructor(rawData) {
    this.rawData = rawData

    this.id = rawData.Id
    this.description = rawData.Groep.Omschrijving
    this.startDate = new Date(rawData.Start)
    this.endDate = new Date(rawData.Einde)
    this.study = rawData.Studie
    this.studyPeriod = rawData.Lesperiode
    this.mainProfile = rawData.Profiel
    this.secondaryProfile = rawData.Profiel2
  }
}

export default Group
