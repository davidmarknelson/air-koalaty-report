import { Component, OnInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  error: string;
  aqi;
  city: string;
  data;

  parsed;
  constructor(private aqiService: AqiService) {
    this.aqiService.data.subscribe(res => this.data = res);
    this.aqiService.error.subscribe(res => this.error = res);
  }

  ngOnInit() {
    this.aqiService.getCurrentCoordinatesData();
    this.parseCurrentLocationAqi();
  }

  parseCurrentLocationAqi() {
    // this.aqiService.getCurrentLocationAQI().subscribe(res => {
    //   let object = JSON.parse(res);
    //   this.aqi = object.data.aqi;
    //   this.city = object.data.city.name;
    // });
  }

}
