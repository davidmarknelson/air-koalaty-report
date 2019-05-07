import { Component, OnInit } from '@angular/core';
import { Aqi } from '../services/aqi/aqi';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  aqi: Aqi;
  errorMessage: string;
  loading: boolean;
  firstSearchInitiated: boolean;

  constructor() {}

  ngOnInit() {
    this.firstSearchInitiated = false;
    this.loading = false;
  }

  onFirstSearchInitiated(firstSearchInitiated: boolean) { this.firstSearchInitiated = firstSearchInitiated }
  onLoading(loading: boolean) { this.loading = loading }
  onAqi(aqi: Aqi) { this.aqi = aqi }
  onErrorMessage(errorMessage: string) { this.errorMessage = errorMessage }
}

