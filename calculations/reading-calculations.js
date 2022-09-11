"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store").stationCollection

class Calculations {

  constructor(reading ,readingUUID) {

    this.latestWeatherText = latestWeatherText(reading.code, 'text');
    this.readingUUID = readingUUID;
    this.fahrenheitTemp = setFahrenheitTemp(reading.temp);
    this.cardinalPoint = setCardinalPoint(reading.windDirection);
    this.beaufort = setBeaufort(reading.wind);
    this.windChill = setWindChill(reading.temp, reading.wind);
    this.weatherCodeIcon = latestWeatherText(reading.code, 'icon')
  }
}


const readingCalculations = {
  returnCalculations(reading ,readingUUID){
    return new Calculations(reading, readingUUID);

  },
  findMinMaxValues(arr, ...properties ){
  let propertiesArr = [...properties];
  console.log(propertiesArr);
  let returnValues = {};
  propertiesArr.forEach(prop =>{
    let min = parseInt(arr[0][prop]);
    let max = parseInt(arr[0][prop]);

    arr.forEach(obj =>{
      if (parseInt(obj[prop]) < min){min = parseInt(obj[prop])}
      if (parseInt(obj[prop]) > max){max = parseInt(obj[prop])}
    })
    returnValues[`Min-${prop}`] = min;
    returnValues[`Max-${prop}`] = max;
  })
  return returnValues;
},


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

const setFahrenheitTemp = (temp) =>{
  return ((temp *((9*1.0)/5)) + 32).toFixed(2);
}

const setCardinalPoint = (windDirection) => {
  let cardinalPoint;
  if (windDirection > 348.75 || windDirection < 11.25){
    cardinalPoint = "North";
  }else if (windDirection > 11.25 && windDirection < 33.75){
    cardinalPoint = "North-Northeast";
  }else if (windDirection > 33.75 && windDirection < 56.25){
    cardinalPoint = "Northeast";
  }else if (windDirection > 56.25 && windDirection < 78.75){
    cardinalPoint = "East-Northeast";
  }else if (windDirection > 78.75 && windDirection < 101.25){
    cardinalPoint = "East";
  }else if (windDirection > 101.25 && windDirection < 123.75){
    cardinalPoint = "East-Southeast";
  }else if (windDirection > 123.75 && windDirection < 146.25){
    cardinalPoint = "Southeast";
  }else if (windDirection > 146.25 && windDirection < 168.75){
    cardinalPoint = "South-Southeast";
  }else if (windDirection > 168.75 && windDirection < 191.25){
    cardinalPoint = "South";
  }else if (windDirection > 191.25 && windDirection < 213.75){
    cardinalPoint = "South-Southwest";
  }else if (windDirection > 213.75 && windDirection < 236.25){
    cardinalPoint = "Southwest";
  }else if (windDirection > 236.25 && windDirection < 258.75){
    cardinalPoint = "West-Southwest";
  }else if (windDirection > 258.75 && windDirection < 281.25){
    cardinalPoint = "West";
  }else if (windDirection > 281.25 && windDirection < 303.75){
    cardinalPoint = "West-Northwest";
  }else if (windDirection > 303.75 && windDirection < 326.25){
    cardinalPoint = "Northwest";
  }else if (windDirection > 326.25 && windDirection < 384.75 ){
    cardinalPoint = "North-Northwest";
  }else{
    cardinalPoint = "Something went wrong";
  }
  return cardinalPoint;
}

const setWindChill = (temperature, windSpeed) => {
  return (13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + ((0.3965 * temperature) * (Math.pow(windSpeed, 0.16)))).toFixed(2);
}

const setBeaufort = (windSpeed) => {
  let beaufort;
  if(windSpeed <=0){
    beaufort = 0;
  } else if(windSpeed >0 && windSpeed <=5){
    beaufort = 1;
  } else if(windSpeed <=11){
    beaufort = 2;
  } else if(windSpeed <=19){
    beaufort = 3;
  } else if(windSpeed <=28){
    beaufort = 4;
  } else if(windSpeed <=38){
    beaufort = 5;
  } else if(windSpeed <=49){
    beaufort = 6;
  } else if(windSpeed <=61){
    beaufort = 7;
  } else if(windSpeed <=74){
    beaufort = 8;
  } else if(windSpeed <=88){
    beaufort = 9;
  } else if(windSpeed <=102){
    beaufort = 10;
  } else if(windSpeed <=117){
    beaufort = 11;
  } else if(windSpeed >=118){
    beaufort = 12;
  } else{
    beaufort = "Something went wrong";
  }
  return beaufort;
}

const findMinValue = (arr, property) => {
  let minValue = arr[0].property;
  arr.forEach(obj => {
    if(obj.property < minValue){
      minValue = obj.property;}
  })
  return minValue;
}

const findMaxValue = (arr, property) => {
  let maxValue = arr[0].property;
  arr.forEach(obj => {
    if(obj.property < maxValue){
      maxValue = obj.property;}
  })
  return maxValue;
}



const print = () => {
  console.log('this is running why?')
}


module.exports = readingCalculations;

