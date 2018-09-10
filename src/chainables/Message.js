/**
 * Message class for creating and sending messages
 * 
 * @memberof Session
 * @prop {Array<Person>} recipients - Recipients of message
 * @prop {Array<Attachment>} attachments - The attachments of the message
 * @prop {Boolean} isImportant - Message importance, if true the message has a little exclemation mark next to it in Magister
 * @prop {String} body - The complete body text of the message
 */
class Message {
  /**
   * Initialize a new Message instance with session
   * @param {Session} session - The currently authenticated session object
   */
  constructor(session) {
    this.session = session

    this.recipients = []
    this.attachments = []
    this.isImportant = false
    this.topic = ''
    this.body = ''

    return this
  }

  /**
   * Function to add recipient to message
   * 
   * @param {Person} recipient - The recipient as a recipient object
   * @returns {Message} - Returns itself for chaining
   */
  addRecipient(recipient) {
    if (typeof recipient === 'object' && recipient.id) {
      this.recipients.push({
        'Id': recipient.id,
        'Type': recipient.type
      })
    } else {
      throw new Error('Recipient is of wrong type! Expected Person')
    }

    return this
  }

  /**
   * Function to add recipient to message
   * 
   * @param {Person} attachment - The attachment as an attachment object 
   * @returns {Message} - Returns itself for chaining
   */
  addAttachment(attachment) {
    if (typeof attachment === 'object' || 1) {
      throw new Error('Work in progress, attachments don`t work atm!')
    } else {
      throw new Error('Attachment is of wrong type! Expected Attachment')
    }
    return this
  }

  /**
   * Function to set message body
   * 
   * @param {String} text - The body string
   * @returns {Message} - Returns itself for chaining
   */
  setBody(text) {
    this.body = text
    return this
  }

  /**
   * Function to set message subject
   * 
   * @param {String} text - The subject string
   * @returns {Message} - Returns itself for chaining
   */
  setSubject(text) {
    this.topic = text
    return this
  }

  /**
   * Function to set message importance
   * 
   * @param {Boolean} important - The importance state
   * @returns {Message} - Returns itself for chaining
   */
  setImportant(important) {
    this.isImportant = important
    return this
  }

  /**
   * Function to send currently staged message
   * 
   * @returns {Promise<Object>} - Promise with http data
   */
  send() {
    return this.session.hitEndpoint('POST', `${this.session.schoolUrl}/api/personen/${this.session.id}/berichten`, {
      data: {
        'Inhoud': this.body,
        'Bijlagen': this.attachments,
        'Onderwerp': this.topic,
        'Afzender': {
          'Id': this.session.id,
          'Type': 3
        },
        'Ontvangers': this.recipients,
        'HeeftPrioriteit': this.isImportant,
        'HeeftBijlagen': this.attachments.length > 0,
        'Soort': 1
      }
    })
  }
}

export default Message
