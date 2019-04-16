import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class AqiService {
  @Output() data: EventEmitter<object>;
  @Output() error: EventEmitter<string>;

  aqiUrlCoords = environment.apiUri + 'waqi/geo/';
  aqiUrlCity = environment.apiUri + 'waqi/city/';
  latitude: string;
  longitude: string;

  constructor(private http: HttpClient) {
    this.data = new EventEmitter();
    this.error = new EventEmitter();
  }

  getCurrentCoordinatesData() {
    this.getLocation().subscribe(pos => {
      this.latitude = pos.coords.latitude.toString();
      this.longitude = pos.coords.longitude.toString();
      this.getCurrentLocationAQI().subscribe(res => {
        this.data.emit(res);
      });
    }, (err) => {
      this.error.emit(err);
    });
  }

  getCurrentLocationAQI(): Observable<any> {
    return this.http.get<any>(this.aqiUrlCoords, { params: {
      lat: this.latitude,
      long: this.longitude
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  // works!!!!
  getCityAQI(city): Observable<any> {
    return this.http.get<any>(this.aqiUrlCity, { params: {
      city: city
    }}).pipe(
      map(res => {
        return JSON.parse(res);
      })
    );
  }

  autocompleteTest() {
    return this.http.get<any>('http://autocomplete.travelpayouts.com/places2?term=Mos&locale=en&types[]=country')
  }

  // doesn't work with interface
  // getCityAQI(city): Observable<City> {
  //   return this.http.get<City>(this.aqiUrlCity, { params: { city: city }});
  // }

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
