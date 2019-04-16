import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
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

    // to test aqi service with out calling Google maps places
    // this.aqiService.getCityAQI('Hanoi').subscribe(res => {this.aqi = res.data.aqi;
    //   this.city = 'Hanoi';
    // });

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

  getSearchedCityAqi() {
    this.loading = true;
    let cityName = this.location.vicinity;
    this.city = cityName;
    return this.aqiService.getCityAQI(cityName).subscribe(res => {
      this.aqi = res.data.aqi;
      this.loading = false;
      this.citySearch.nativeElement.value = '';
    });
  }

  createForm() {
    this.searchForm = this.fb.group({
      location: ['']
    });
  }
}
