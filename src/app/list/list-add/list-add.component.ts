import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {
  aqi: object;
  errorMessage: string;
  loading: boolean;
  firstSearchInitiated: boolean;

  constructor() { }

  ngOnInit() {
  }

  onFirstSearchInitiated(firstSearchInitiated: boolean) { this.firstSearchInitiated = firstSearchInitiated }
  onLoading(loading: boolean) { this.loading = loading }
  onAqi(aqi: object) { this.aqi = aqi }
  onErrorMessage(errorMessage: string) { this.errorMessage = errorMessage }

}
