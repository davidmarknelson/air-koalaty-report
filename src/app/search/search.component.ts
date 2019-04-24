import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('citySearch') citySearch: ElementRef;
  searchForm: FormGroup;
  aqi: number;
  errorMessage: string;
  loading: boolean;
  firstSearchInitiated: boolean;
  searchComplete: boolean;
  city: string;
  state: string;
  country: string;
  autocomplete: any;

  constructor(
    private aqiService: AqiService, 
    private ngZone: NgZone, 
    private gmaps: MapsAPILoader, 
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.firstSearchInitiated = false;
    this.loading = false;
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
    this.firstSearchInitiated = true;
    this.loading = true;
    this.aqi = null;
    if (this.searchComplete) {
      return this.aqiService.getCityAQI(this.city, this.state, this.country)
      .subscribe(res => {
        this.aqi = res;
        this.loading = false;
        this.resetSearch();
      });
    } else {
      return this.errorMessage = 'Select city from the autocomplete suggestions';
    }
  }

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

  resetSearch() {
    this.searchComplete = false;
    this.city = '';
    this.state = '';
    this.country = '';
    this.autocomplete = null;
    this.searchForm.reset();
  }

  parseAutocompleteData(address) {
    if (address) {
      this.searchComplete = true;
      this.city = address['0'].long_name;
      this.state = address['2'].long_name;      
      this.country = address['3'].long_name;
    } else {
      this.searchComplete = false;
    }
  }
}

