import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AqiService } from '../../services/aqi/aqi.service';
import { States } from '../../services/aqi/states';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  country: string;
  states: States;
  loading: boolean;

  constructor(private route: ActivatedRoute, private aqiService: AqiService) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.aqiService.getStates(this.country).subscribe(res => {
      this.loading = false;
      this.states = res
    },
    err => {
      this.loading = false;
    });
  }

}
