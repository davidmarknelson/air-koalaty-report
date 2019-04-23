import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Subscription } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('citySearch') citySearch: ElementRef;
  searchForm: FormGroup;
  location: any;
  aqi: number;
  error: string;
  loading: boolean;
  enterPressed: boolean;
  inputSub: Subscription;
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
    this.enterPressed = false;
    this.loading = false;
    this.createForm();
    this.inputSub = this.searchForm.valueChanges.subscribe(res => {
      this.location = res.location;
    });

    this.gmaps.load().then(() => {
      const autocomplete =
      new google.maps.places.Autocomplete(this.citySearch.nativeElement, {
        types: ['(cities)']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.autocomplete = autocomplete.getPlace();
          console.log(this.autocomplete);
          this.city = this.autocomplete.address_components['0'].long_name;
          this.state = this.autocomplete.address_components['2'].long_name;      
          this.country = this.autocomplete.address_components['3'].long_name;
          console.log(this.city);
        });
      });
    });
  }

  ngOnDestroy() {
    this.inputSub.unsubscribe();
  }

  getSearchedCityAqi() {
    this.loading = true;
    this.aqi = null;
    return this.aqiService.getCityAQI(this.city, this.state, this.country).subscribe(res => {
      this.aqi = res;
      this.loading = false;
      this.searchForm.reset();
      this.autocomplete = null;
      this.enterPressed = false;
    });
  }

  toggleEnterToSubmit(event) {
    if (!this.enterPressed && this.autocomplete) { 
      console.log('in if');
      event.preventDefault();
      event.stopPropagation();
      this.enterPressed = true;
    }
  }

  createForm() {
    this.searchForm = this.fb.group({
      location: ['']
    });
  }
}
