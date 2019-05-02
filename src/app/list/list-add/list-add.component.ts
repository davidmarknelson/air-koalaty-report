import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AqiService } from '../../services/aqi/aqi.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../services/user/user';
import { Aqi } from '../../services/aqi/aqi';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {
  aqi: Aqi;
  errorMessage: string;
  loading: boolean;
  firstSearchInitiated: boolean;
  id: string;

  constructor(private user: UserService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getProfile((err, profile) => {
      this.id = profile.sub;
    });
  }

  onFirstSearchInitiated(firstSearchInitiated: boolean) { this.firstSearchInitiated = firstSearchInitiated }
  onLoading(loading: boolean) { this.loading = loading }
  onAqi(aqi: Aqi) { this.aqi = aqi }
  onErrorMessage(errorMessage: string) { this.errorMessage = errorMessage }

  addCity() {
    let city = this.createCityObj();
    this.user.addCity(city).subscribe(
      () => this.router.navigate(['/list'])
    );
  }

  createCityObj() {
    if (this.aqi) {
      let city = {
        userId: this.id,
        city: this.aqi.data.city,
        state: this.aqi.data.state,
        country: this.aqi.data.country
      }
      return city;
    }
  }
}
