import { Component, OnInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
import { Countries } from '../services/aqi/countries';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: Countries;
  loading: boolean;
  errorMessage: string;
  
  constructor(private aqiService: AqiService) { }

  ngOnInit() {
    this.loading = true;
    this.aqiService.getCountries().subscribe(res => {
      this.loading = false;
      this.countries = res; 
    },
    err => {
      this.loading = false;
      this.errorMessage = err.error.message;
    });
  }

}
