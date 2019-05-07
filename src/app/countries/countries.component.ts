import { Component, OnInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: Array<object>;
  constructor(private aqiService: AqiService) { }

  ngOnInit() {
    this.aqiService.getCountries().subscribe(res => this.countries = res.data);
  }

}
