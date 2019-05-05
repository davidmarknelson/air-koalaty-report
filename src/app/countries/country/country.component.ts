import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AqiService } from '../../services/aqi/aqi.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  country: string;
  states: any;

  constructor(private route: ActivatedRoute, private aqiService: AqiService) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.aqiService.getStates(this.country).subscribe(res => this.states = res.data);
  }

}
