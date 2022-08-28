"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store");
const calculations = require("../calculations/reading-calculations");


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Weathertop 2.0",
      data: {
        stations: stationStore.getAllStations(),
        calculations: calculations.returnCalculations( { id: '3', code: 500, temp: 66, wind: 33, pressure: 44 }),
        test: "test"
      },

    };
    logger.info('about to render', stationStore.getAllStations);
    response.render("dashboard", viewData);
  },

};

module.exports = dashboard;
