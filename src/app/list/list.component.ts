import { Component, OnInit } from '@angular/core';
// Angular Material
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from "@angular/material";
// Interfaces
import { Aqi } from '../services/aqi/aqi';
// Services
import { AqiService } from '../services/aqi/aqi.service';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  id: string;
  aqiCities: Array<Aqi> = [];
  canEdit: boolean;
  loading: boolean;
  isCityListMaxed: boolean;

  constructor(
    public auth: AuthService, 
    private user: UserService, 
    private aqiService: AqiService,
    private dialog: MatDialog,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.canEdit = false;
    this.loading = true;
    this.auth.getProfile((err, profile) => {
      if (err) {
        console.log(err);
        this.loading = false;
      }
      this.id = profile.sub;
      this.getAqiInfo(this.id);
    });
  }

  getAqiInfo(id) {
    this.user.getCityList(id).subscribe(res => {
      this.loading = false;
      this.isCityListMaxed = res.cities.length >= 3;
      this.loopCityArrayForAqi(res.cities);
    });
  }

  loopCityArrayForAqi(cities) {
    for (let city of cities) {
      this.loading = true;
      let cityObj = this.storageService.createCityObj(city.city, city.state, city.country);
      let storedCity = this.storageService.checkStorageForCity(cityObj);
      if (storedCity) {
        storedCity._id = city._id;
        this.loading = false;
        this.aqiCities.push(storedCity);
      } else {
        this.getAqiFromApi(city);
      }
    }
  }

  toggleEdit() {
    this.canEdit = !this.canEdit;
  }

  openDeleteDialog(city) {
    let cityObj = {
      userId: this.id,
      cityId: city._id
    }

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
            this.checkCityListLengthForMax();
          });
        }
      }
    );  
  }

  getAqiFromApi(cityObj) {
    this.loading = true;
    this.aqiService.getCity(cityObj.city, cityObj.state, cityObj.country).subscribe(
      res => {
        this.loading = false;
        res._id = cityObj._id;
        this.aqiCities.push(res);
      },
      err => {
        this.loading = false;
      }
    );
  }

  checkCityListLengthForMax() {
    this.user.getCityList(this.id).subscribe(res => {
      this.isCityListMaxed = res.cities.length >= 3;
    });
  }
  
  
}
