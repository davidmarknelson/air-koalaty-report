import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AqiService } from '../../services/aqi/aqi.service';
import { Aqi } from '../../services/aqi/aqi';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  country: string;
  state: string;
  city: string;
  aqi: Aqi;
  loading: boolean;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private aqiService: AqiService) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.state = params['state'];
    this.city = params['city'];
    this.loading = true;
    this.aqiService.getCity(this. city, this.state, this.country).subscribe(res => {
      this.loading = false;
      this.aqi = res;
    },
    err => {
      this.loading = false;
      this.errorMessage = err;
      console.log(err);
    });
  }

}
