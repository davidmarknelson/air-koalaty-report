import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
// Interfaces
import { Countries } from '../services/aqi/countries';
// Services
import { AqiService } from '../services/aqi/aqi.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: Countries;
  loading: boolean;
  
  constructor(private aqiService: AqiService, private storageService: StorageService) { }

  ngOnInit() {
    this.loading = true;
    this.getCountriesFromStorageOrApi().subscribe(res => {
      this.countries = res;
      this.loading = false;
    }, err => this.loading = false);
  }

  getCountriesFromStorageOrApi(): Observable<any> {
    let countries = JSON.parse(localStorage.getItem('countries'));
    let timestampExpired = this.storageService.hasTimestampExpired(countries);
    if (timestampExpired) {
      return this.aqiService.getCountries();
    } else {
      return of(countries.countries);
    }
  }

}
