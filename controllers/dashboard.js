"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store");
const calculations = require("../calculations/reading-calculations");
const uuid = require('uuid');


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Weathertop 2.0",
      data: {
        stations: stationStore.getAllStations(),
        calculations: calculations.returnCalculations( { id: '3', code: 500, temp: 66, wind: 33, pressure: 44 }),

      },

    };
    logger.info('about to render', stationStore.getAllStations);
    response.render("dashboard", viewData);
  },
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },

};

module.exports = dashboard;
