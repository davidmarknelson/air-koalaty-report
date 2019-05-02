import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUri;

  constructor(private http: HttpClient) { }

  getCityList(userId): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}citylist`, { params: {
      userId: userId
    }});
  }

  addCity(city): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}citylist/addcity`, city);
  }

  deleteCity(city): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}citylist/deletecity`, city);
  }
}
