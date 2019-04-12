import { Component, OnInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any[];
  error: string;
  aqi: number;
  city: string;
  
  constructor(private aqiService: AqiService) {
    this.aqiService.data.subscribe(res => this.data = res);
    this.aqiService.error.subscribe(res => this.error = res);
  }

  ngOnInit() {
    this.aqiService.getCurrentCoordinatesData();
  }

}
