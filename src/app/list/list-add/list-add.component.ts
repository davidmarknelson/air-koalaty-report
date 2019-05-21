import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Aqi } from '../../services/aqi/aqi';

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

  constructor(
    private user: UserService, 
    private router: Router, 
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.getProfile((err, profile) => {
      this.id = profile.sub;
    });
  }

  onFirstSearchInitiated(firstSearchInitiated: boolean) { this.firstSearchInitiated = firstSearchInitiated }
  onLoading(loading: boolean) { this.loading = loading }
  onAqi(aqi: Aqi) { this.aqi = aqi }

  addCity() {
    let city = this.createCityObj();
    this.user.addCity(city).subscribe(
      () => {
        this.router.navigate(['/list'])
      },
      err => {
        this.loading = false;
      }
    );
  }

  createCityObj() {
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
}
