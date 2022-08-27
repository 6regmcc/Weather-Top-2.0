'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/stations-store');

const station = {
    index(request, response) {
        const stationId = request.params.id;
        logger.info('Station id = ' + stationId);
        const viewData = {
            title: 'Station',
            station: stationStore.getStation(stationId),
        };
        response.render('station', viewData);
    },
};

module.exports = station;