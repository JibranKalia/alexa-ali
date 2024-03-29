"use strict";

const Alexa = require("alexa-sdk");
let constants = require("./constants");
let stateHandlers = require("./stateHandlers");
let audioEventHandlers = require("./audioEventHandlers");

// const { logger } = require("./utils");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Alexa is working");
});

router.post("/", (req, res) => {
  mainAlexaHandler(req.body, req.body.context, (err, response) => res.send(response));
});

const mainAlexaHandler = (event, context, callback) => {
  console.log("Inside Main Alexa Handler");
  let alexa = Alexa.handler(event, context);
  alexa.appId = constants.appId;
  alexa.dynamoDBTableName = constants.dynamoDBTableName;
  alexa.registerHandlers(
    stateHandlers.startModeIntentHandlers,
    stateHandlers.playModeIntentHandlers,
    stateHandlers.remoteControllerHandlers,
    stateHandlers.resumeDecisionModeIntentHandlers,
    audioEventHandlers
  );

  if (constants.debug) {
    console.log("\n" + "******************* REQUEST **********************");
    console.log(event);

    let origCallback = callback;
    callback = function(error, response) {
      console.log("\n" + "******************* RESPONSE  **********************");
      console.log("\n" + response, null, 2);
      return origCallback(error, response);
    };
  }

  let audioPlayerInterface = ((((event.context || {}).System || {}).device || {}).supportedInterfaces || {})
    .AudioPlayer;
  if (audioPlayerInterface === undefined) {
    alexa.emit(":tell", "Sorry, this skill is not supported on this device");
  } else {
    alexa.execute();
  }
};

module.exports = router;
