import { Component, OnInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  aqi: any;
  errorMessage: string;
  
  constructor(private aqiService: AqiService) {
    this.aqiService.aqiData.subscribe(res => this.aqi = res);
    this.aqiService.aqiError.subscribe(res => this.errorMessage = res);
  }

  ngOnInit() {
    this.aqiService.getCurrentCoordinatesAqi();
  }
}

// testing lat & long
// lat
// 21.0217217
// long
// 105.8188748