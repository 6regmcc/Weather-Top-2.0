'use strict';

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
};

module.exports = stationStore;