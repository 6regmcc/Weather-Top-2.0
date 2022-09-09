'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/stations-store');
const uuid = require('uuid');
const axios = require('axios');






const station = {
    index(request, response) {
        const stationId = request.params.id;
        const stationReadings = stationStore.getStation(stationId).readings;
        logger.info('Station id = ' + stationId);
        const viewData = {
            title: 'Station',
            station: stationStore.getStation(stationId),

            data: {
                stations: [stationStore.getStation(stationId)],
                trendData: stationStore.getTrendData('temp', stationReadings),
            }

        };
        console.log(viewData.trendData);
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
            temp: parseFloat(request.body.temperature).toFixed(2),
            wind: request.body.windspeed,
            windDirection: request.body.winddirection,
            pressure: request.body.pressure,
            id: uuid.v1(),
            time: new Date(),
        };

        logger.debug('New Reading  = ', newReading);
        stationStore.addReading(stationId, newReading, newReading.id );
        response.redirect('/station/' + stationId);
    },
    async addReport(request, response) {
        logger.info("rendering new report");
        const stationId = request.params.id;
        const stationName =request.params.stationname;
        let report = {};
        //const lat = request.body.lat;
        //const lng = request.body.lng;
        const requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${stationName},IE&units=metric&appid=2733d024b1d44dc2fcbdae888110f397`
        const result = await axios.get(requestUrl);
        if (result.status == 200) {
            const reading = result.data;
            console.log(reading);

            report.code = `${reading.weather[0].id}`;
            report.temp = `${reading.main.temp}`;
            report.wind = `${reading.wind.speed}`;
            report.pressure = `${reading.main.pressure}`;
            report.windDirection = `${reading.wind.deg}`;
            report.time = new Date();
            report.id = uuid.v1(),

            stationStore.addReading(stationId, report,)

        }
        console.log(report);
        response.redirect('/station/' + stationId);
    }

};

module.exports = station;