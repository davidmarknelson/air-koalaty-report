import { Component, OnInit } from '@angular/core';
// Angular Material
import { MatSnackBar } from '@angular/material';
// Interfaces
import { Aqi } from '../services/aqi/aqi';
// Services
import { AqiService } from '../services/aqi/aqi.service';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {
  aqi: Aqi;
  error: boolean;
  loading: boolean;
  
  constructor(
    private aqiService: AqiService, 
    private snackBar: MatSnackBar
  ) {}

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
      });
    }, err => {
      this.loading = false;
      this.snackBar.open(`ERROR: ${err.message}`,'Close', {
        panelClass: ['red-snackbar']
      });
      this.error = true;
      console.log(err);
    });
  }

  
}