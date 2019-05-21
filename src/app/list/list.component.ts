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
  id: string;
  aqiCities: Array<Aqi> = [];
  canEdit: boolean;
  loading: boolean;

  constructor(
    public auth: AuthService, 
    private user: UserService, 
    private aqiService: AqiService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.canEdit = false;
    this.auth.getProfile((err, profile) => {
      if (err) {console.log(err);}
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
      this.aqiService.getCity(city.city, city.state, city.country).subscribe(
        res => {
          res._id = city._id;
          this.aqiCities.unshift(res);
        },
        err => {
          this.loading = false;
        }
      );
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
          });
        } 
      }
    );  
  }
  
}
