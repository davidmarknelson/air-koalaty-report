import { Component, OnInit, OnDestroy } from '@angular/core';
import { concatMap,takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Interfaces
import { Aqi } from '../services/aqi/aqi';
// Services
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  aqi: Aqi;
  error: boolean;
  loading: boolean;
  firstSearchInitiated: boolean;
  cityListNotMaxed: boolean;
  id: string;
  info: boolean;
  private ngUnsubscribe = new Subject();

  constructor(
    private user: UserService, 
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.info = false;
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

  onFirstSearchInitiated(firstSearchInitiated: boolean) { this.firstSearchInitiated = firstSearchInitiated }
  onLoading(loading: boolean) { this.loading = loading }
  onError(error: boolean) { this.error = error }
  onAqi(aqi: Aqi) { this.aqi = aqi }


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

  showInfo() {
    this.info = !this.info;
  }
}

