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
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('citySearch') citySearch: ElementRef;
  searchForm: FormGroup;
  location: any;
  aqi: number;
  city: string;
  error: string;
  loading: boolean;
  enterPressed: boolean;
  inputSub;

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
          this.location = autocomplete.getPlace().name;
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
    let cityName = this.location;
    this.city = cityName;
    return this.aqiService.getCityAQI(cityName).subscribe(res => {
      this.aqi = res.data.aqi;
      this.loading = false;
      this.searchForm.reset();
      this.location = '';
    });
  }

  toggleEnterToSubmit(event) {
    if (!this.enterPressed) { 
      event.preventDefault();
      event.stopPropagation();
      this.enterPressed = !this.enterPressed;
    } else if (this.enterPressed) {
      this.enterPressed = !this.enterPressed;
    } 
  }

  createForm() {
    this.searchForm = this.fb.group({
      location: ['']
    });
  }
}
