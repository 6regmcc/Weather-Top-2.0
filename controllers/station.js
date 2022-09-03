'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/stations-store');
const uuid = require('uuid');

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
    addReading(request, response) {
        const stationId = request.params.id;
        const station = stationStore.getStation(stationId);
        const newReading = {
            code: request.body.code,
            temp: request.body.temperature,
            wind: request.body.windspeed,
            pressure: request.body.pressure,
            id: uuid.v1(),
        };

        logger.debug('New Reading  = ', newReading);
        stationStore.addReading(stationId, newReading, newReading.id );
        response.redirect('/station/' + stationId);
    },
};

module.exports = station;