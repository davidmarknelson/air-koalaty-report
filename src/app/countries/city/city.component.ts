import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, of, Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
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
export class CityComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  country: string;
  state: string;
  city: string;
  aqi: Aqi;
  loading: boolean;
  cityListNotMaxed: boolean;
  id: string;
  error: boolean;

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
    }, err => {
      this.error = true;
      this.loading = false;
    });
    this.auth.getProfile((err, profile) => {
      if (err) { console.log(err); }
      this.id = profile.sub;
      if (this.id) {
        this.checkCityListLengthForMax();
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getAqiFromLocalStorageOrApi(city, state, country): Observable<Aqi> {
    let cityObj = this.storageService.createCityObj(city, state, country);
    let storedCity = this.storageService.checkStorageForCity(cityObj);
    if (storedCity) {
      return of(storedCity).pipe(takeUntil(this.ngUnsubscribe));
    } else {
      return this.aqiService.getCity(city, state, country).pipe(takeUntil(this.ngUnsubscribe));      
    }
  }

  addCity() {
    let city = this.user.createCityObjWithId(this.id, this.aqi);
    this.user.addCity(city).pipe(
        concatMap(() => this.user.getCityList(this.id)),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(res => {
      this.cityListNotMaxed = res.cities.length < 3;
    });
  }

  checkCityListLengthForMax() {
    this.user.getCityList(this.id).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      this.cityListNotMaxed = res.cities.length < 3;
      }
    );
  }

}
