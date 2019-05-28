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


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.addAqiColorClass();
  }

  addAqiColorClass() {
    let aqi;
    if (this.aqi) aqi = this.aqi.current.pollution.aqius;
    if (!this.aqi) {
      this.aqiColorClass = '';
    } else if (aqi <= 50) {
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
    }
  }
}
