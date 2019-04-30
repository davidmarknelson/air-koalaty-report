import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUri;

  constructor(private http: HttpClient) { }

  getCityList(userId): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}citylist`, { params: {
      userId: userId
    }});
  }
}
