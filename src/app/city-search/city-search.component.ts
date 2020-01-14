import { Component, OnInit, ViewChild, ElementRef, NgZone, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// Services
import { AqiService } from '../services/aqi/aqi.service';
// Interfaces
import { Aqi } from '../services/aqi/aqi';
// Google autocomplete
import { MapsAPILoader } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  @ViewChild('citySearch')
  private citySearch: ElementRef;
  @Output() aqi = new EventEmitter<Aqi>();
  @Output() firstSearchInitiated = new EventEmitter<boolean>();
  @Output() loading = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<boolean>();
  autocomplete: any;
  lat: number;
  lng: number;
  searchComplete: boolean;
  searchForm: FormGroup;

  constructor(
    private ngZone: NgZone,
    private gmaps: MapsAPILoader,
    private fb: FormBuilder,
    private aqiService: AqiService
  ) { }

  ngOnInit() {
    this.firstSearchInitiated.emit(false);
    this.error.emit(false);
    this.loading.emit(false);
    this.searchComplete = false;
    this.createForm();

    this.gmaps.load().then(() => {
      const autocomplete =
      new google.maps.places.Autocomplete(this.citySearch.nativeElement, {
        types: ['(cities)']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.autocomplete = autocomplete.getPlace();

          // If a user has selected an option from the Google autocomplete suggestions, autocomplete.geometry
          // will be true. If the user has typed the city and not selected a suggestion, autocomplete will
          // only have { name: typedName } and autocomplete.geometry will be false. Info from autocomplete.geometry 
          // is needed for the api to get data.
          if (this.autocomplete.geometry) {
            this.lat = this.autocomplete.geometry.location.lat();
            this.lng = this.autocomplete.geometry.location.lng();
            this.searchComplete = true;
          };
        });
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getSearchedCityAqi() {
    if (this.searchComplete) {
      this.error.emit(false);
      this.aqi.emit(null);
      this.loading.emit(true);
      this.firstSearchInitiated.emit(true);
      this.aqiService.getGeoLocationAqi(this.lat, this.lng)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(res => {
          this.loading.emit(false);
          this.aqi.emit(res);
          this.resetSearch();
        }, err => {
          this.loading.emit(false);
          this.error.emit(true);
          this.resetSearch();
        });
    }
  }

  resetSearch() {
    this.searchComplete = false;
    this.autocomplete = null;
    this.searchForm.reset();
  }

  // This prevents users from using the enter key to submit the city
  // until they have selected a city from Google autocomplete.
  // Then they can use the enter key as normal.
  toggleEnterToSubmit(event) {
    if (!this.searchComplete) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  createForm() {
    this.searchForm = this.fb.group({
      location: ['']
    });
  }

}
