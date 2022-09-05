"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store");
const calculations = require("../calculations/reading-calculations");
const uuid = require('uuid');
const accounts = require ('./accounts.js');


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Weathertop 2.0",

      data: {
        stations: stationStore.getUserStations(loggedInUser.id),
      },

    };

    logger.info('about to render', stationStore.getAllStations);
    response.render("dashboard", viewData);
  },
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    console.log('this is running');
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],

    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },

};

module.exports = dashboard;
