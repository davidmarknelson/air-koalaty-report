import { Component, OnInit, Input, OnChanges } from '@angular/core';
// Interfaces
import { Aqi } from '../services/aqi/aqi';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnChanges {
  @Input() aqi: Aqi;
  @Input() loading: boolean;
  windSpeedInMiles: number;
  windSpeedInKilometers: number;
  tempInFahrenheit: number;
  tempInCelsius: number;
  isImperialSelected: boolean;

  constructor() { }

  ngOnInit() {
    this.isImperialSelected = true;
  }

  ngOnChanges() {
    if (this.aqi) {
      this.changeWindSpeedToKilometers();
      this.changeWindSpeedToMiles();
      this.changeTempToFahrenheit();
      this.assignTempInCelcius();
    }
  }

  changeWindSpeedToMiles() {
    let speed = this.aqi.current.weather.ws * 2.237;
    if (speed % 1 === 0) {
      this.windSpeedInMiles = speed;
    } else {
      this.windSpeedInMiles = Number(speed.toFixed(0));
    }
  }
  
  changeWindSpeedToKilometers() {
    let speed = this.aqi.current.weather.ws * 3.6;
    if (speed % 1 === 0) {
      this.windSpeedInKilometers = speed;
    } else {
      this.windSpeedInKilometers = Number(speed.toFixed(0));
    }
  }

  changeTempToFahrenheit() {
    let temp = (this.aqi.current.weather.tp * 1.8) + 32;
    this.tempInFahrenheit = Number(temp.toFixed(0));
  }

  assignTempInCelcius() {
    this.tempInCelsius = this.aqi.current.weather.tp;
  }

  toggleImperialAndMetric() {
    this.isImperialSelected = !this.isImperialSelected;
  }

}
