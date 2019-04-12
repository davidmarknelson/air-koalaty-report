import { Component, OnInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  city: any[];

  constructor(private aqiService: AqiService) { }

  ngOnInit() {
    this.aqiService.getCityAQI('Hanoi').subscribe(res => this.city = JSON.parse(res));
  }
}
