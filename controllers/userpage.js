

const logger = require('../utils/logger');
const userStore = require('../models/user-store');
const accounts = require("./accounts");
const stationStore = require("../models/stations-store");


const userPage = {
  index(request, response){
    logger.info("user page rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'User page',
      user: loggedInUser,

    }
    logger.info('about to render', loggedInUser);
    response.render("userpage", viewData);
  }

}

module.exports = userPage