import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Environment
import { environment } from '../../../environments/environment';
// Interfaces
import { Aqi } from './aqi';
import { Cities } from './cities';
import { Countries } from './countries';
import { States } from './states';

@Injectable({
  providedIn: 'root'
})
export class AqiService {
  aqiUrlCoords = `${environment.apiUri}airvisual/geo/`;
  aqiUrlCountries = `${environment.apiUri}airvisual/countries`;
  aqiUrlStates = `${environment.apiUri}airvisual/states`;
  aqiUrlCities = `${environment.apiUri}airvisual/cities`;
  aqiUrlCity = `${environment.apiUri}airvisual/city`;

  constructor(private http: HttpClient) {}

  getLocation(): Observable<any> {
    return Observable.create(observer => {
      if(navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(position => {
            observer.next(position);
            observer.complete();
          },error => {
            observer.error(error);
          }, {enableHighAccuracy: false, timeout: 7000}
        );
      } else {
        observer.error('Unsupported browser');
      }
    });
  }

  getGeoLocationAqi(lat, long): Observable<Aqi> {
    return this.http.get<Aqi>(this.aqiUrlCoords, { params: {
      lat: lat,
      long: long
    }});
  }

  getCountries(): Observable<Countries> {
    return this.http.get<Countries>(this.aqiUrlCountries);
  }

  getStates(country): Observable<States> {
    return this.http.get<States>(this.aqiUrlStates, { params: {
      country: country
    }});
  }

  getCities(state, country): Observable<Cities> {
    return this.http.get<Cities>(this.aqiUrlCities, { params: {
      state: state,
      country: country
    }});
  }

  getCity(city, state, country): Observable<Aqi> {
    return this.http.get<Aqi>(this.aqiUrlCity, { params: {
      city: city,
      state: state,
      country: country
    }});
  }
}
