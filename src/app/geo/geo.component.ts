import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, timeout } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
export class GeoComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  aqi: Aqi;
  error: boolean;
  loading: boolean;
  lat: string;
  long: string;

  constructor(private aqiService: AqiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getCurrentCoordinatesAqi();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCurrentCoordinatesAqi() {
    this.loading = true;
    this.aqiService.getLocation().pipe(
      timeout(6500),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(pos => {
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
      this.error = true;
      this.loading = false;
      this.snackBar.open(`ERROR: ${err.message}`,'Close', {
        panelClass: ['red-snackbar'],
        duration: 5000
      });
      console.log(err);
    });
  }
  
}