import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AqiService } from '../../services/aqi/aqi.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  country: any;
  state: any;
  city: any;
  aqi: any;

  constructor(private route: ActivatedRoute, private aqiService: AqiService) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.state = params['state'];
    this.city = params['city'];
    this.aqiService.getCity(this. city, this.state, this.country).subscribe(res => this.aqi = res);
  }

}
