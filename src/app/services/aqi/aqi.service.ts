import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Aqi } from './aqi';

@Injectable({
  providedIn: 'root'
})
export class AqiService {
  aqiUrlCoords = `${environment.apiUri}airvisual/geo/`;
  aqiUrlCountries = `${environment.apiUri}airvisual/countries`;
  aqiUrlStates = `${environment.apiUri}airvisual/states`;
  aqiUrlCities = `${environment.apiUri}airvisual/cities`;
  aqiUrlCity = `${environment.apiUri}airvisual/city/`;


  constructor(private http: HttpClient) {}
 
  getLocation(): Observable<any> {
    return Observable.create(observer => {
      if(window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }

  getGeoLocationAqi(lat, long): Observable<any> {
    return this.http.get<any>(this.aqiUrlCoords, { params: {
      lat: lat,
      long: long
    }})
    // HttpClient should return an object, but it is only returning a string. WHY???
    .pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.aqiUrlCountries).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  getStates(country): Observable<any> {
    return this.http.get<any>(this.aqiUrlStates, { params: {
      country: country
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  getCities(state, country): Observable<any> {
    return this.http.get<any>(this.aqiUrlCities, { params: {
      state: state,
      country: country
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  getCity(city, state, country): Observable<any> {
    return this.http.get<any>(this.aqiUrlCity, { params: {
      city: city,
      state: state,
      country: country
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

}
