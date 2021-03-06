/** A Person object for further interaction with people 
 * @memberof Session
 * @prop {String} firstName - The first name of the person
 * @prop {String} nameInfix - The name infix of the person
 * @prop {String} lastName - The last name of the person
 * @prop {String} officialFirstNames - All the offical first names of the person
 * @prop {String} initials - The initials of the person
 * @prop {String} birthDate - The birthdate of the person
 * @prop {Number} type - The person type
 */
class Person {
  /**
   * Initializes new Person object from a raw data object
   * @param {Object} rawData - The raw data directly parsed from JSON
   */
  constructor(rawData) {
    this.rawData = rawData

    this.id = rawData.Id
    this.firstName = rawData.Roepnaam
    this.nameInfix = rawData.GebruikGeboortenaam ? rawData.GeboortenaamTussenvoegsel : rawData.OfficieleTussenvoegsels
    this.lastName = rawData.GebruikGeboortenaam ? rawData.GeboorteAchternaam : rawData.OfficieleAchternaam
    this.officialFirstNames = rawData.OfficieleVoornamen
    this.initials = rawData.Voorletters
    this.birthDate = rawData.Geboortedatum
    this.type = rawData.Type || 3
  }
}

export default Person
