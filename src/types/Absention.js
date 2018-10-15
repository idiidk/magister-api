"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** An Absention object for further interaction with appointments 
 * @memberof Session
 * @prop {Boolean} Geoorloofd
 * @prop {Array<Object>} Afspraak
 * @prop {Number} Lesuur
 * @prop {Date} Eind
 * @prop {Date} Start
 * @prop {Number} AfspraakId
 * @prop {String} Code
 * @prop {String} Omschrijving
 * @prop {Number} Verantwoordingstype
 * @prop {Number} Id
 */
class Appointment {
  /**
   * Initializes new Appointment object from a raw data object
   * @param {Object} rawData - The raw data directly parsed from JSON
   */
  constructor(rawData) {
    this.rawData = rawData;

    this.appointmentid = rawData.AfspraakId;
    this.code = rawData.Code;
    this.end = rawData.Eind;
    this.allowedly = rawData.Geoorloofd;
    this.id = rawData.Id;
    this.lesson = rawData.Lesuur;
    this.startDate = new Date(rawData.Start);
    this.endDate = new Date(rawData.Einde);
    this.description = rawData.Omschrijving;
    this.accountabilityType = rawData.Verantwoordingtype;
  }
}

exports.default = Appointment;