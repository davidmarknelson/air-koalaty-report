import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Aqi } from '../../services/aqi/aqi';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {
  aqi: Aqi;
  loading: boolean;
  firstSearchInitiated: boolean;
  id: string;
  isCityListAtLimit: boolean;

  constructor(
    private user: UserService, 
    private router: Router, 
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.auth.getProfile((err, profile) => {
      if (err) { console.log(err); }
      this.id = profile.sub;
      this.checkCityListLengthForMax();
    });
  }

  onFirstSearchInitiated(firstSearchInitiated: boolean) { this.firstSearchInitiated = firstSearchInitiated }
  onLoading(loading: boolean) { this.loading = loading }
  onAqi(aqi: Aqi) { this.aqi = aqi }

  addCity() {
    let city = this.createCityObjWithId();
    this.user.addCity(city).subscribe(
      () => {
        this.router.navigate(['/list'])
      },
      err => {
        this.loading = false;
      }
    );
  }

  createCityObjWithId() {
    if (this.aqi) {
      let city = {
        userId: this.id,
        city: this.aqi.city,
        state: this.aqi.state,
        country: this.aqi.country
      }
      return city;
    }
  }

  checkCityListLengthForMax() {
    this.user.getCityList(this.id).subscribe(res => {
      this.isCityListAtLimit = res.cities.length >= 3;
      if (this.isCityListAtLimit) {
        this.snackBar.open('You already have the maximum number of cities saved on your list.','Close', {
          panelClass: ['blue-snackbar']
        });
      }
    });
  }
}
