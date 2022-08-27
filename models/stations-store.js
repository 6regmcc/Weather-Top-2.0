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
    removeReading(id, readingId) {
        const station = this.getStation(id);
        console.log(`this is the id ${id} and this is the reading ${readingId}`)
        // TODO : remove the song with id songId from the playlist
    },
};

module.exports = stationStore;