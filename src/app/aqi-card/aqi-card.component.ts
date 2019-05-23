import { Component, OnInit, Input, OnChanges } from '@angular/core';
// Interfaces
import { Aqi } from '../services/aqi/aqi';

@Component({
  selector: 'app-aqi-card',
  templateUrl: './aqi-card.component.html',
  styleUrls: ['./aqi-card.component.css']
})
export class AqiCardComponent implements OnInit, OnChanges {
  @Input() aqi: Aqi;
  @Input() loading: boolean;
  aqiColorClass: string;
  windSpeedInMiles: number;
  windSpeedInKilometers: number;
  tempInFahrenheit: number;
  tempInCelsius: number;
  isMphSelected: boolean;
  isFahrenheitSelected: boolean;

  constructor() { }

  ngOnInit() {
    this.isMphSelected = true;
    this.isFahrenheitSelected = true;
  }

  ngOnChanges() {
    if (this.aqi) {
      this.addAqiColorClass();
      this.changeWindSpeedToKilometers();
      this.changeWindSpeedToMiles();
      this.changeTempToFahrenheit();
      this.assignTempInCelcius();
    }
  }

  addAqiColorClass() {
    let aqi = this.aqi.current.pollution.aqius;
    if (aqi <= 50) {
      this.aqiColorClass = 'good';
    } else if (aqi >= 51 && aqi <= 100) {
      this.aqiColorClass = 'moderate';
    } else if (aqi >= 101 && aqi <= 150) {
      this.aqiColorClass = 'sensitive';
    } else if (aqi >= 151 && aqi <= 200) {
      this.aqiColorClass = 'unhealthy';
    } else if (aqi >= 201 && aqi <= 300) {
      this.aqiColorClass = 'very-unhealthy';
    } else if (aqi >= 301) {
      this.aqiColorClass = 'hazardous';
    } else {
      this.aqiColorClass = '';
    }
  }

  changeWindSpeedToMiles() {
    let speed = this.aqi.current.weather.ws * 2.237;
    if (speed % 1 === 0) {
      this.windSpeedInMiles = speed;
    } else {
      this.windSpeedInMiles = Number(speed.toFixed(2));
    }
  }
  
  changeWindSpeedToKilometers() {
    let speed = this.aqi.current.weather.ws * 3.6;
    if (speed % 1 === 0) {
      this.windSpeedInKilometers = speed;
    } else {
      this.windSpeedInKilometers = Number(speed.toFixed(2));
    }
  }

  changeTempToFahrenheit() {
    let temp = (this.aqi.current.weather.tp * 1.8) + 32;
    this.tempInFahrenheit = Number(temp.toFixed(0));
  }

  assignTempInCelcius() {
    this.tempInCelsius = this.aqi.current.weather.tp;
  }

  toggleWindSpeed() {
    this.isMphSelected = !this.isMphSelected;
  }

  toggleTemp() {
    this.isFahrenheitSelected = !this.isFahrenheitSelected;
  }

}
