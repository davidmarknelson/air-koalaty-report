import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, concatMap, finalize, filter, takeUntil } from 'rxjs/operators';
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
export class ListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  aqiCities: Array<Aqi> = [];
  canEdit: boolean;
  id: string;
  cityListNotMaxed: boolean;
  loading: boolean;
  showIndexScale: boolean;

  constructor(
    public auth: AuthService, 
    private aqiService: AqiService,
    private dialog: MatDialog,
    private storageService: StorageService, 
    private user: UserService
  ) { }

  ngOnInit() {
    this.showIndexScale = false;
    this.loading = true;
    this.canEdit = false;
    this.auth.getProfile((err, profile) => {
      if (err) { this.loading = false; }
      this.id = profile.sub;
      if (this.id) {
        this.getCityListAndAqiData(this.id).subscribe(res => {
          this.showIndexScale = true;
          this.aqiCities.push(res);
        });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCityListAndAqiData(id): Observable<any> {
    return this.user.getCityList(id).pipe(
      concatMap((user: User) => {
        this.cityListNotMaxed = user.cities.length < 3;
        return from(user.cities);
      }), mergeMap(city => {
        return this.getAqiFromStorageOrApi(city);        
      }), finalize(() => {
        this.loading = false;
      }),
      takeUntil(this.ngUnsubscribe) 
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
        }),
        takeUntil(this.ngUnsubscribe)
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

    dialogRef.afterClosed().pipe(
      filter(data => data === true),
      concatMap(() => this.user.deleteCity(cityObj)), 
      mergeMap(() => this.user.getCityList(this.id)),
      takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.aqiCities = this.aqiCities.filter(x => x !== city);
      this.cityListNotMaxed = res.cities.length < 3;
    });
  }

  checkCityListLengthForMax() {
    this.user.getCityList(this.id).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      this.cityListNotMaxed = res.cities.length < 3;
    });
  }
  
}
