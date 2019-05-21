import { Component, OnInit, Input } from '@angular/core';
import { Aqi } from '../services/aqi/aqi';
@Component({
  selector: 'app-aqi-card',
  templateUrl: './aqi-card.component.html',
  styleUrls: ['./aqi-card.component.css']
})
export class AqiCardComponent implements OnInit {
  @Input() aqi: Aqi;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {

  }

}
