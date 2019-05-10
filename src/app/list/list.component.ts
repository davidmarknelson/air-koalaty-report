import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { AqiService } from '../services/aqi/aqi.service';
import { Aqi } from '../services/aqi/aqi';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  id: any;
  aqiCities: Array<Aqi> = [];
  canEdit: boolean;

  constructor(
    public auth: AuthService, 
    private user: UserService, 
    private aqiService: AqiService,
    private dialog: MatDialog
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
      
      this.aqiService.getCity(cityName, state, country).subscribe(
        res => this.aqiCities.unshift(res)
      );
    }
  }

  toggleEdit() {
    this.canEdit = !this.canEdit;
  }

  createCityObject(city) {
    return {
      userId: this.id,
      city: city.city,
      state: city.state,
      country: city.country
    }
  }

  openDeleteDialog(city) {  
    let cityObj = this.createCityObject(city);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        city: city.city,
        state: city.state,
        country: city.country
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.user.deleteCity(cityObj).subscribe(() => {
            this.aqiCities = this.aqiCities.filter(x => x !== city);
          });
        } 
      }
    );  
  }
  
}
