"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store")

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Weathertop 2.0",
      stations: stationStore.getAllStations(),
    };
    logger.info('about to render', stationStore.getAllStations);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
