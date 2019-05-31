import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
// Interfaces
import { Aqi } from '../../services/aqi/aqi';
// Services
import { AqiService } from '../../services/aqi/aqi.service';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  country: string;
  state: string;
  city: string;
  aqi: Aqi;
  loading: boolean;
  cityListNotMaxed: boolean;
  id: string;

  constructor(
    private route: ActivatedRoute, 
    private aqiService: AqiService,
    private storageService: StorageService,
    private user: UserService, 
    private auth: AuthService
  ) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.state = params['state'];
    this.city = params['city'];
    this.loading = true;
    this.getAqiFromLocalStorageOrApi(this.city, this.state, this.country).subscribe(res => {
      this.loading = false;
      this.aqi = res;
    }, err => this.loading = false);
    this.auth.getProfile((err, profile) => {
      if (err) { console.log(err); }
      this.id = profile.sub;
      if (this.id) {
        this.checkCityListLengthForMax();
      }
    });
  }

  getAqiFromLocalStorageOrApi(city, state, country): Observable<Aqi> {
    let cityObj = this.storageService.createCityObj(city, state, country);
    let storedCity = this.storageService.checkStorageForCity(cityObj);
    if (storedCity) {
      return of(storedCity);
    } else {
      return this.aqiService.getCity(city, state, country);      
    }
  }

  addCity() {
    let city = this.user.createCityObjWithId(this.id, this.aqi);
    this.user.addCity(city).pipe(
        concatMap(() => this.user.getCityList(this.id))
      ).subscribe(res => {
      this.cityListNotMaxed = res.cities.length < 3;
    });
  }

  checkCityListLengthForMax() {
    this.user.getCityList(this.id).subscribe(res => {
      this.cityListNotMaxed = res.cities.length < 3;
      }
    );
  }

}
