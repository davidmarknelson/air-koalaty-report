import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { AqiService } from '../services/aqi/aqi.service';
import { resetComponentState } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  id: any;
  aqiCities: Array<Object> = [];

  constructor(public auth: AuthService, private user: UserService, private aqiService: AqiService) { }

  ngOnInit() {
    this.auth.getProfile((err, profile) => {
      this.id = profile.sub;
      this.getAqiInfo(this.id);
    });
  }

  getAqiInfo(id) {
    this.user.getCityList(id).subscribe(res => {
      let cities = res.cities;
      this.loopCityArray(cities);
    });
  }

  loopCityArray(cities) {
    for (let city of cities) {
      this.aqiService.getCityAQI(city.city, city.state, city.country).subscribe(
        res => this.aqiCities.unshift(res)
      );
    }
    console.log(this.aqiCities);
  }

}
