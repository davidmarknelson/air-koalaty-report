import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
// Interfaces
import { Cities } from '../../services/aqi/cities';
// Services
import { AqiService } from '../../services/aqi/aqi.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  country: any;
  state: any;
  loading: boolean;
  cities: Cities;
  
  constructor(private route: ActivatedRoute, private aqiService: AqiService) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.state = params['state'];
    this.loading = true;
    this.aqiService.getCities(this.state, this.country).subscribe(res => {
      this.loading = false;
      this.cities = res
    },
    err => {
      this.loading = false;
    });
  }

}
