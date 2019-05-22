import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { AqiService } from '../services/aqi/aqi.service';
import { Aqi } from '../services/aqi/aqi';
import { StorageService } from '../services/storage/storage.service';

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
    for (let i = 0; i < cities.length; i++) {
      this.loading = true;
      let cityObj = this.storageService.createCityObj(cities[i].city, cities[i].state, cities[i].country);
      let storedCity = this.storageService.checkStorageForCity(cityObj);
      if (storedCity) {
        storedCity._id = cities[i]._id;
        this.aqiCities.push(storedCity);
        if (i === cities.length - 1) {
          this.loading = false;
        }
      } else {
        this.getAqiFromApi(cities[i], cities, i);
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
            this.checkCityListLengthForMax()
          });
        }
      }
    );  
  }

  getAqiFromApi(cityObj, cityList, i) {
    this.aqiService.getCity(cityObj.city, cityObj.state, cityObj.country).subscribe(
      res => {
        res._id = cityObj._id;
        this.aqiCities.push(res);
        if (i === cityList.length - 1) {
          this.loading = false;
        }
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
