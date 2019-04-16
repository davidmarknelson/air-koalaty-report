import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
import { City } from '../services/aqi/city';

// test
import { map, tap } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';
declare var google: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  @ViewChild('searchedCity') searchedCity: ElementRef;
  @ViewChild('testGooglePlaces') citySearch: ElementRef;
  aqi: number;
  city: string;
  location: any;

  constructor(
    private aqiService: AqiService, 
    private ngZone: NgZone, 
    private gmaps: MapsAPILoader, 
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();

    this.aqiService.getCityAQI('Hanoi').subscribe(res => {this.aqi = res.data.aqi;
      this.city = 'Hanoi';
    });

    this.gmaps.load().then(() => {
      const autocomplete =
      new google.maps.places.Autocomplete(this.citySearch.nativeElement, {
        types: ['(cities)']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.location = autocomplete.getPlace();

          console.log(autocomplete.getPlace());
        });
      });
    });
  }

  // works, but waiting to figure out interface
  search() {
    let cityName = this.location.vicinity;
    // this.searchedCity.nativeElement.value = '';
    this.city = cityName;
    return this.aqiService.getCityAQI(cityName).subscribe(res => this.aqi = res.data.aqi);
  }

  createForm() {
    this.searchForm = this.fb.group({
      location: ['', Validators.required]
    });
  }
}
