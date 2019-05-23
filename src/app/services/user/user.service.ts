import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Interfaces
import { User } from './user';
// Environment
import { environment } from '../../../environments/environment';

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
    return this.http.put<User>(`${this.apiUrl}citylist/removecity`, city);
  }
}
