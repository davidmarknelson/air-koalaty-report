import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, concatMap, finalize } from 'rxjs/operators';
// Angular Material
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from "@angular/material";
// Interfaces
import { Aqi } from '../services/aqi/aqi';
import { User } from '../services/user/user';
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
  aqiCities: Array<Aqi> = [];
  canEdit: boolean;
  id: string;
  isCityListMaxed: boolean;
  loading: boolean;
  showEditAndIndexScale: boolean;

  constructor(
    public auth: AuthService, 
    private aqiService: AqiService,
    private dialog: MatDialog,
    private storageService: StorageService, 
    private user: UserService
  ) { }

  ngOnInit() {
    this.showEditAndIndexScale = false;
    this.loading= true;
    this.canEdit = false;
    this.auth.getProfile((err, profile) => {
      if (err) { this.loading = false; }
      this.id = profile.sub;
      this.getCityListAndAqiData(this.id).subscribe(res => {
        this.showEditAndIndexScale = true;
        this.aqiCities.push(res);
      });
    });
  }

  getCityListAndAqiData(id): Observable<any> {
    return this.user.getCityList(id).pipe(
      concatMap((user: User) => {
        this.isCityListMaxed = user.cities.length >= 3;
        return from(user.cities);
      }), mergeMap(city => {
        return this.getAqiFromStorageOrApi(city);        
      }), finalize(() => {
        this.loading = false;
      }) 
    )
  };

  getAqiFromStorageOrApi(city): Observable<Aqi> {
    let cityObj = this.storageService.createCityObj(city.city, city.state, city.country);
    let storedCity = this.storageService.checkStorageForCity(cityObj);
    if (storedCity) {
      storedCity._id = city._id;
      return of(storedCity);
    } else {
      return this.aqiService.getCity(city.city, city.state, city.country).pipe(
        map(res => {
          res._id = city._id;
          return res;
        })
      )
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

  checkCityListLengthForMax() {
    this.user.getCityList(this.id).subscribe(res => {
      this.isCityListMaxed = res.cities.length >= 3;
    });
  }
  
}
