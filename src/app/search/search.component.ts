import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { AqiService } from '../services/aqi/aqi.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('citySearch') citySearch: ElementRef;
  searchForm: FormGroup;
  location: any;
  aqi: number;
  city: string;
  error: string;
  loading: boolean;

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
      console.log('form',this.location);
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

  ngAfterViewInit() {
    let input = document.getElementById('searchInput');
    let enterPressed = false;

    input.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && !enterPressed) { 
          e.preventDefault();
          e.stopPropagation();
          enterPressed = !enterPressed;
      } else if (e.keyCode === 13 && enterPressed) {
        enterPressed = !enterPressed;
      }
    });
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

  createForm() {
    this.searchForm = this.fb.group({
      location: ['']
    });
  }
}
