const { default: Magister } = require("../dist/magister");
const chai = require("chai");
const mConf = require("./magisterConfig.json");
const expect = chai.expect;
let magister;
let session;
let me;
let msg;

describe("Magister", function() {
  magister = new Magister(
    mConf.schoolName,
    mConf.username,
    mConf.password
  );

  describe("#findSchool", function() {
    it("Should be able to find a school by name", function() {
      return magister.findSchool("baudartius").then(schools => {
        expect(schools[0].Name).to.equal("Baudartius College");
      });
    });
  });

  describe("#authenticate", function() {
    it("Should be able to authenticate with Magister servers", function() {
      return magister.authenticate().then(newSession => {
        session = newSession;
      });
    });
  });
});

describe("Session", function() {
  describe("#getProfileInfo", function() {
    it("Should be able to retrieve user profile info", function() {
      return session.getProfileInfo().then(profile => {
        expect(typeof profile).to.equal("object");
        me = profile;
        msg = new session.Message();
      });
    });
  });

  describe("#getAppointments", function() {
    it("Should be able to retrieve user appointments", function() {
      return session
        .getAppointments(new Date(), new Date(new Date().getTime() + 86400000))
        .then(appointments => {
          expect(typeof appointments.length).to.equal("number");
        });
    });
  });

  describe("#getGroups", function() {
    it("Should be able to retrieve user groups", function() {
      return session.getGroups().then(groups => {
        expect(typeof groups.length).to.equal("number");
      });
    });
  });

  describe("#saveAuth", function() {
    it("Should be able to save authentication for later", function() {
      const authData = session.saveAuth();
      return magister.authenticate(authData);
    });
  });
});

describe("Message", function() {
  describe("#setSubject", function() {
    it("Should be able to set message subject", function() {
      msg.setSubject("Tests Running (magister-api)");
    });
  });

  describe("#setBody", function() {
    it("Should be able to set message body", function() {
      msg.setBody("It worked!");
    });
  });

  describe("#addRecipient", function() {
    it("Should be able to add recipient from Person object", function() {
      msg.addRecipient(me);
    });
  });

  describe("#send", function() {
    it("Should be able to send a message", function() {
      return msg.send();
    });
  });
});
