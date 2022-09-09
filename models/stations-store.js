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
        this.updateAllCalculationsAndMinMaxValues(stations);
        return this.store.findAll(this.collection);
    },

    getStation(id) {
        return this.store.findOneBy(this.collection, { id: id });
    },
    removeReading(id, readingId) {
        const station = this.getStation(id);
        const readings = station.readings;
        _.remove(readings, { id: readingId});
        this.updateAllCalculationsAndMinMaxValues([station]);
        this.store.save();
    },

    removeStation(id) {
        const station = this.getStation(id);
        this.store.remove(this.collection, station);
        this.store.save();
    },

    addReading(id, reading, readingUUID) {
        const station = this.getStation(id);
        station.readings.push(reading);
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
                stations[i].calculations = readingCalculations.returnCalculations(latestReading, latestReading.id);
                stations[i].minMaxValues = readingCalculations.findMinMaxValues(stations[i].readings, "wind","temp","pressure");
                this.store.save();
            }else{
                stations[i].calculations = {};
                stations[i].minMaxValues = {};
                this.store.save();
            }
        }

    },
    getTrendData(key, readings){
        let trendData = {
            arrDates: [],
            arrTemp: [],
            arrWind: [],
            arrPressure: []
        }
        readings.forEach(obj =>{
            trendData.arrDates.push(obj.time);
            trendData.arrTemp.push(obj.temp)
            trendData.arrWind.push(obj.wind)
            trendData.arrPressure.push(obj.pressure)
        })

        console.log(trendData);
        return trendData;
    },

};



module.exports = stationStore;