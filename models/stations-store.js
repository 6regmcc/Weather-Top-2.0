'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');
const readingCalculations = require('../calculations/reading-calculations')

const stationStore = {

    stationCollection: require('./stations-store.json').stationCollection,

    store: new JsonStore('./models/stations-store.json', { stationCollection: [] }),
    collection: 'stationCollection',

    getAllStations() {
        let stations = this.store.findAll(this.collection);
        for(let i = 0;i < stations.length;i++){
            let latestReading = stations[i].readings[stations[i].readings.length - 1];
            if(latestReading){
                stations[i].calculations = [];
                stations[i].calculations.push(readingCalculations.returnCalculations(latestReading, latestReading.id));
                this.store.save();
            }
        }
        return this.store.findAll(this.collection);
    },

    getStation(id) {
        return this.store.findOneBy(this.collection, { id: id });
    },
    removeReading(id, readingId) {
        const station = this.getStation(id);
        const readings = station.readings;
        const calculations = station.calculations;
        _.remove(readings, { id: readingId});
        _.remove(calculations, { readingUUID: readingId});
        this.store.save();
    },

    removeStation(id) {
        const station = this.getStation(id);
        this.store.remove(this.collection, station);
        this.store.save();
    },

    addReading(id, reading, readingUUID) {
        const station = this.getStation(id);
        let calculations = readingCalculations.returnCalculations(reading, readingUUID)
        station.readings.push(reading);
        station.calculations = []
        station.calculations.push(calculations);
        this.store.save();

    },
    addStation(station) {
        this.store.add(this.collection, station);
        this.store.save();
    },
};

module.exports = stationStore;