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

  constructor(
    private aqiService: AqiService, 
    private ngZone: NgZone, 
    private gmaps: MapsAPILoader, 
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loading = false;
    this.createForm();
    this.searchForm.valueChanges.subscribe(res => {
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

    this.enterPressed = false;
    this.citySearch.nativeElement.addEventListener('keypress', this.toggleEnterToSubmit);
  }

  ngOnDestroy() {
  }

  getSearchedCityAqi() {
    this.loading = true;
    let cityName = this.location;
    console.log('cityName', cityName);
    this.city = cityName;
    return this.aqiService.getCityAQI(cityName).subscribe(res => {
      this.aqi = res.data.aqi;
      this.loading = false;
      this.searchForm.reset();
      this.location = '';
    });
  }

  toggleEnterToSubmit(e) {
    if (e.keyCode === 13 && !this.enterPressed) { 
      e.preventDefault();
      e.stopPropagation();
      this.enterPressed = !this.enterPressed;
    } else if (e.keyCode === 13 && this.enterPressed) {
      this.enterPressed = !this.enterPressed;
    } 
  }

  createForm() {
    this.searchForm = this.fb.group({
      location: ['']
    });
  }
}
