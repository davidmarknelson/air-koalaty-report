import { Component, OnInit, ViewChild, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
// Services
import { AqiService } from '../services/aqi/aqi.service';
import { StorageService } from '../services/storage/storage.service';
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
export class CitySearchComponent implements OnInit {
  @ViewChild('citySearch')
  private citySearch: ElementRef;
  @Output() aqi = new EventEmitter<Aqi>();
  @Output() firstSearchInitiated = new EventEmitter<boolean>();
  @Output() loading = new EventEmitter<boolean>();
  autocomplete: any;
  city: string;
  state: string;
  country: string;
  searchComplete: boolean;
  searchForm: FormGroup;

  constructor(
    private ngZone: NgZone,
    private gmaps: MapsAPILoader,
    private fb: FormBuilder,
    private aqiService: AqiService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.firstSearchInitiated.emit(false);
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
          // If a user has selected an option from the Google autocomplete suggestions, address_components
          // will be true. If the user has typed the city and not selected a suggestion, autocomplete will
          // only have { name: typedName } and address_components will be false. Info from address_components 
          // is needed for the api to get data.
          this.parseAutocompleteData(this.autocomplete.address_components);
        });
      });
    });
  }

  getSearchedCityAqi() {
    if (this.searchComplete) {
      this.getAqiFromStorageOrApi(this.city, this.state, this.country).subscribe(res => {
        this.loading.emit(false);
        this.aqi.emit(res);
        this.resetSearch();
      }, err => this.loading.emit(false));
    }
  }

  getAqiFromStorageOrApi(city, state, country): Observable<Aqi> {
    let cityObj = this.storageService.createCityObj(city, state, country);
    let storedCity = this.storageService.checkStorageForCity(cityObj);
    if (storedCity) {
      this.firstSearchInitiated.emit(true);
      return of(storedCity);
    } else {
      this.firstSearchInitiated.emit(true);
      this.loading.emit(true);
      this.aqi.emit(null);
      return this.aqiService.getCity(city, state, country);
    }
  }

  resetSearch() {
    this.searchComplete = false;
    this.city = '';
    this.state = '';
    this.country = '';
    this.autocomplete = null;
    this.searchForm.reset();
  }

  // Some cities have county, city, state, country variables and
  // some have only city, state, country. This checks for that.
  parseAutocompleteData(address) {
    if (!address) return this.searchComplete = false;
    if (address.length === 4) {
      this.searchComplete = true;
      this.city = address['0'].long_name;
      this.state = address['2'].long_name;
      let country = this.parseUSA(address['3'].long_name);
      this.country = country;
    } else if (address.length === 3) {
      this.searchComplete = true;
      this.city = address['0'].long_name;
      this.state = address['1'].long_name;
      let country = this.parseUSA(address['2'].long_name);
      this.country = country;
    } else {
      this.searchComplete = false;
    }
  }

  // Google autocomplete saves the USA as United States.
  // The api lists the USA as USA. This formats the data for the api.
  parseUSA(country) {
    if (country === 'United States') {
      return 'USA';
    } else {
      return country;
    }
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
