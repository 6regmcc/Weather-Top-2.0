'use strict';
const logger = require("../utils/logger");
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
            stations[i].minMaxValues = [];
            stations[i].minMaxValues.push(readingCalculations.findMinMaxValues(stations[i].readings, "wind","temp","pressure"))
            this.store.save();
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
        //let calculations = readingCalculations.returnCalculations(reading, readingUUID)
        station.readings.push(reading);
        //station.calculations = []
        //station.calculations.push(calculations);
        this.updateAllCalculationsAndMinMaxValues([station]);
        this.store.save();


    },
    addStation(station) {
        this.store.add(this.collection, station);
        this.store.save();
    },
    getUserStations(userid) {
        let stations = this.store.findBy(this.collection, { userid: userid });
        this.updateAllCalculationsAndMinMaxValues(stations);
        return stations;
    },
    updateAllCalculationsAndMinMaxValues(stations){
        for(let i = 0;i < stations.length;i++){
            let latestReading = stations[i].readings[stations[i].readings.length - 1];
            if(latestReading){
                stations[i].calculations = [];
                stations[i].calculations.push(readingCalculations.returnCalculations(latestReading, latestReading.id));
                stations[i].minMaxValues = [];
                stations[i].minMaxValues.push(readingCalculations.findMinMaxValues(stations[i].readings, "wind","temp","pressure"))
                this.store.save();
            }
        }
    },
};



module.exports = stationStore;