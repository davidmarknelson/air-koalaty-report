import { Component, OnInit } from '@angular/core';
// Interfaces
import { Countries } from '../services/aqi/countries';
// Services
import { AqiService } from '../services/aqi/aqi.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: Countries;
  loading: boolean;
  
  constructor(private aqiService: AqiService) { }

  ngOnInit() {
    this.loading = true;
    this.aqiService.getCountries().subscribe(res => {
      this.loading = false;
      this.countries = res; 
    },
    err => {
      this.loading = false;
    });
  }

}
