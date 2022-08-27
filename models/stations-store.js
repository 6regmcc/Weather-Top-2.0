'use strict';
const _ = require('lodash');

const stationStore = {

    stationCollection: require('./stations-store.json').stationCollection,

    getAllStations() {
        return this.stationCollection;
    },

    getStation(id) {
        let foundStation = null;
        for (let station of this.stationCollection) {
            if (id == station.id) {
                foundStation = station;
            }
        }

        return foundStation;
    },
    removeReading(id, readingId) {
        const station = this.getStation(id);
        _.remove(station.readings, { id: readingId });

        // TODO : remove the song with id songId from the playlist
    },
};

module.exports = stationStore;