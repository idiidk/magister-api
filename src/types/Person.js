/** A group object for futher interaction with groups 
 * @memberof Session
 * @prop {String} firstName - The first name of the person
 * @prop {String} nameInfix - The name infix of the person
 * @prop {String} lastName - The last name of the person
 * @prop {String} officialFirstNames - All the offical first names of the person
 * @prop {String} initials - The initials of the person
 * @prop {String} birthDate - The birthdate of the person
 */
class Person {
  /**
   * Initializes new Group object from a raw data object
   * @param {Object} rawData - The raw group data directly parsed from JSON
   */
  constructor(rawData) {
    this.rawData = rawData

    this.firstName = rawData.Roepnaam
    this.nameInfix = rawData.OfficieleTussenvoegsels
    this.lastName = rawData.OfficieleAchternaam
    this.officialFirstNames = rawData.OfficieleVoornamen
    this.initials = rawData.Voorletters
    this.birthDate = rawData.Geboortedatum
  }
}

export default Person
