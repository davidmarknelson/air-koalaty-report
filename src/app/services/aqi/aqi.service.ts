import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AqiService {
  // Variables for the home module
  @Output() aqiData: EventEmitter<object>;
  @Output() aqiError: EventEmitter<string>;
  // Variables for this service
  aqiUrlCoords = environment.apiUri + 'airvisual/geo/';
  aqiUrlCity = environment.apiUri + 'airvisual/city/';
  latitude: string;
  longitude: string;
  environment = environment;

  constructor(private http: HttpClient) {
    this.aqiData = new EventEmitter();
    this.aqiError = new EventEmitter();
  }

  getCurrentCoordinatesAqi() {
    this.getLocation().subscribe(pos => {
      this.latitude = pos.coords.latitude.toString();
      this.longitude = pos.coords.longitude.toString();
      this.getCurrentLocationAqi().subscribe(res => {
        this.aqiData.emit(res);
      });
    }, (err) => {
      this.aqiError.emit(err);
    });
  }

  getCurrentLocationAqi(): Observable<any> {
    return this.http.get<any>(this.aqiUrlCoords, { params: {
      lat: this.latitude,
      long: this.longitude
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  getCityAQI(city, state, country): Observable<any> {
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
