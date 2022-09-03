"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store").stationCollection

class Calculations {

  constructor(reading ,readingUUID) {

    this.latestWeatherText = latestWeatherText(reading.code, 'text');
    this.readingUUID = readingUUID;

  }
}


const readingCalculations = {
  returnCalculations(reading ,readingUUID){
    return new Calculations(reading, readingUUID);

  }

}
const latestWeatherText = (code, selector) => {
  if(code < 100){
    return "invalid code";
  }
  let weatherCodeIcon;
  let weatherCodeText
  if(code == 100){
    weatherCodeIcon = "sun icon";
    weatherCodeText = "Clear";
  }else if(code == 200){
    weatherCodeIcon = "cloud sun icon";
    weatherCodeText = "Partial clouds";
  }else if(code == 300){
    weatherCodeIcon = "cloud icon";
    weatherCodeText = "Cloudy";
  }else if(code == 400){
    weatherCodeIcon = "cloud sun rain icon";
    weatherCodeText = "Light Showers";
  }else if(code == 500){
    weatherCodeIcon = "cloud showers heavy icon";
    weatherCodeText = "Heavy Showers";
  }else if(code == 600){
    weatherCodeIcon = "cloud rain icon";
    weatherCodeText = "Rain";
  }else if(code == 700){
    weatherCodeIcon = "snowflake icon";
    weatherCodeText = "Snow";
  }else if(code == 800){
    weatherCodeIcon = "bolt icon";
    weatherCodeText = "Thunder";
  }

  if (selector == 'text'){
    return weatherCodeText;
  }else if(selector == 'icon'){
    return weatherCodeIcon;
  }
}

module.exports = readingCalculations;

