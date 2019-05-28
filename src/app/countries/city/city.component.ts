import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
// Interfaces
import { Aqi } from '../../services/aqi/aqi';
// Services
import { AqiService } from '../../services/aqi/aqi.service';
import { StorageService } from '../../services/storage/storage.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  country: string;
  state: string;
  city: string;
  aqi: Aqi;
  loading: boolean;

  constructor(
    private route: ActivatedRoute, 
    private aqiService: AqiService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.state = params['state'];
    this.city = params['city'];
    this.loading = true;
    this.getAqiFromLocalStorageOrApi(this.city, this.state, this.country).subscribe(res => {
      this.loading = false;
      this.aqi = res;
    }, err => this.loading = false);
  }

  getAqiFromLocalStorageOrApi(city, state, country): Observable<Aqi> {
    let cityObj = this.storageService.createCityObj(city, state, country);
    let storedCity = this.storageService.checkStorageForCity(cityObj);
    if (storedCity) {
      return of(storedCity);
    } else {
      return this.aqiService.getCity(city, state, country);      
    }
  }

}
