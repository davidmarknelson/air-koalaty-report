import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
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
export class CountriesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  countries: Countries;
  error: boolean;
  loading: boolean;
  
  constructor(private aqiService: AqiService, private storageService: StorageService) { }

  ngOnInit() {
    this.loading = true;
    this.getCountriesFromStorageOrApi().subscribe(res => {
      this.countries = res;
      this.loading = false;
    }, err => {
      this.error = true;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCountriesFromStorageOrApi(): Observable<any> {
    let countries = JSON.parse(localStorage.getItem('countries'));
    let timestampExpired = this.storageService.hasTimestampExpired(countries);
    if (timestampExpired) {
      return this.aqiService.getCountries().pipe(takeUntil(this.ngUnsubscribe));
    } else {
      return of(countries.countries).pipe(takeUntil(this.ngUnsubscribe));
    }
  }

}
