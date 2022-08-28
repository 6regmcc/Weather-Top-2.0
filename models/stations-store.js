'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');

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
        this.store.save();
    },

    removeStation(id) {
        _.remove(this.stationCollection, { id: id });
        this.store.save();
    },
    addReading(id, reading) {
        const station = this.getStation(id);
        station.readings.push(reading);
        this.store.save();
    },
    addStation(station) {
        this.stationCollection.push(station);
        this.store.save();
    },
};

module.exports = stationStore;