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
    deleteReading(request, response) {
        const stationId = request.params.id;
        const readingId = request.params.readingid;
        logger.debug(`Deleting reading ${readingId} from Station ${stationId}`);
        stationStore.removeReading(stationId, readingId);
        response.redirect('/station/' + stationId);
    },
};

module.exports = station;