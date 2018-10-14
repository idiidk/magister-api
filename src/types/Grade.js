import Subject from "./Subject.js";

/** A Grade object for further interaction with grades 
 * @memberof Session
 * @prop {Date} gotAt - Date you got the grade at
 * @prop {Boolean} hasExemption
 * @prop {Date} addedAt - Date the grade was added at
 * @prop {Boolean} isPassing
 * @prop {Number} columnId
 * @prop {Boolean} hasToRetry
 * @prop {String} description
 * @prop {Boolean} counts
 * @prop {Subject} subject - Subject of the grade
 * @prop {value} value - Subject name
 * @prop {weighingFactor} 
 */
class Grade {
  /**
   * Initializes new Grade object from a raw data object
   * @param {Object} rawData - The raw data directly parsed from JSON
   */
  constructor(rawData) {
    this.rawData = rawData

    this.gotAt = new Date(rawData.behaaldOp);
    this.hasExemption = rawData.heeftVrijstelling;
    this.addedAt = new Date(rawData.ingevoerdOp);
    this.isPassing = rawData.isVoldoende;
    this.columnId = rawData.kolomId;
    this.hasToRetry = rawData.moetInhalen;
    this.description = rawData.omschrijving;
    this.counts = rawData.teltMee;
    this.subject = new Subject(rawData.vak);
    this.value = rawData.waarde;
    this.weighingFactor = rawData.weegFactor;
  }
}

export default Grade
