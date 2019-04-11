import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AqiService {
  @Output() data: EventEmitter<object>;
  @Output() error: EventEmitter<string>;

  aqiUrl = environment.apiUri + 'waqi/';
  latitude;
  longitude;

  constructor(private http: HttpClient) {
    this.data = new EventEmitter();
    this.error = new EventEmitter();
  }

  getCurrentCoordinatesData() {
    this.getLocation().subscribe(pos => {
      this.latitude = pos.coords.latitude.toString();
      this.longitude = pos.coords.longitude.toString();
      this.getCurrentLocationAQI().subscribe(res => this.data.emit(res));
    }, (err) => {
      this.error.emit(err);
    });
  }

  getCurrentLocationAQI(): Observable<any> {
    return this.http.get<any>(this.aqiUrl, { params: {
      lat: this.latitude,
      long: this.longitude
    }});
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
