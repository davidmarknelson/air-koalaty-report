import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { AqiService } from '../services/aqi/aqi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  id: any;
  aqiCities: Array<Object> = [];
  canEdit: boolean;

  constructor(
    public auth: AuthService, 
    private user: UserService, 
    private aqiService: AqiService
  ) { }

  ngOnInit() {
    this.canEdit = false;
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
      let cityName = city.city;
      let state = city.state;
      let country = city.country;
      
      this.aqiService.getCityAqi(cityName, state, country).subscribe(
        res => this.aqiCities.unshift(res)
      );
    }
  }

  deleteCity(city) {
    let cityObj = {
      userId: this.id,
      city: city.data.city,
      state: city.data.state,
      country: city.data.country
    }
    this.user.deleteCity(cityObj).subscribe(() => {
      this.aqiCities = this.aqiCities.filter(x => x !== city);
    });
  }

  toggleEdit() {
    this.canEdit = !this.canEdit;
  }

}
