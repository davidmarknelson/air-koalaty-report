import { Component, OnInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
import { Aqi } from '../services/aqi/aqi';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {
  aqi: Aqi;
  errorMessage: any;
  loading: boolean;
  
  constructor(private aqiService: AqiService) {}

  ngOnInit() {
    this.getCurrentCoordinatesAqi();
  }

  getCurrentCoordinatesAqi() {
    this.loading = true;
    this.aqiService.getLocation().subscribe(pos => {
      let lat = pos.coords.latitude.toString();
      let long = pos.coords.longitude.toString();
      this.aqiService.getGeoLocationAqi(lat, long).subscribe((res: Aqi) => {
        this.loading = false;
        this.aqi = res;
      },
      err => {
        this.loading = false;
        this.errorMessage = err.message;
      });
    }, (err) => {
      this.loading = false;
      this.errorMessage = err.message;
    });
  }
}