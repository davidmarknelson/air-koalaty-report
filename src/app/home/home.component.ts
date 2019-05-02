import { Component, OnInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
import { Aqi } from '../services/aqi/aqi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  aqi: any;
  errorMessage: string;
  
  constructor(private aqiService: AqiService) {}

  ngOnInit() {
    this.getCurrentCoordinatesAqi();
  }

  getCurrentCoordinatesAqi() {
    this.aqiService.getLocation().subscribe(pos => {
      let lat = pos.coords.latitude.toString();
      let long = pos.coords.longitude.toString();
      this.aqiService.getCurrentLocationAqi(lat, long).subscribe((res) => {
        this.aqi = res;
      });
    }, (err) => {
      this.errorMessage = err;
    });
  }
}