"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/stations-store")

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "what do I put here",
      stations: stationCollection,

    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
