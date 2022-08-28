'use strict';
const _ = require('lodash');

const stationStore = {

    stationCollection: require('./stations-store.json').stationCollection,

    getAllStations() {
        return this.stationCollection;
    },

    getStation(id) {
        return _.find(this.stationCollection, { id: id });
    },
    removeReading(id, readingId) {
        const station = this.getStation(id);

        _.remove(station.readings, { id: readingId });
    },
};

module.exports = stationStore;