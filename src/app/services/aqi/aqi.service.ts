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
  aqiUrlCoords = environment.apiUri + 'airvisual/geo/';
  aqiUrlCity = environment.apiUri + 'airvisual/city/';

  constructor(private http: HttpClient) {}

  getCurrentLocationAqi(lat, long): Observable<any> {
    return this.http.get<any>(this.aqiUrlCoords, { params: {
      lat: lat,
      long: long
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  getCityAqi(city, state, country): Observable<any> {
    return this.http.get<any>(this.aqiUrlCity, 
      { params: {
      city: city,
      state: state,
      country: country
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }
 
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

}
