import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
import { City } from '../services/aqi/city';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchedCity') searchedCity: ElementRef;
  city: any;

  constructor(private aqiService: AqiService) { }

  ngOnInit() {
    this.aqiService.getCityAQI('Hanoi').subscribe(res => this.city = res);
  }

  // works, but waiting to figure out interface
  search() {
    let cityName = this.searchedCity.nativeElement.value;
    this.searchedCity.nativeElement.value = '';
    return this.aqiService.getCityAQI(cityName).subscribe(res => this.city = res);
  }

}
