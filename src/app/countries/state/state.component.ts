import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
// Interfaces
import { Cities } from '../../services/aqi/cities';
// Services
import { AqiService } from '../../services/aqi/aqi.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  country: string;
  state: string;
  loading: boolean;
  cities: Cities;
  error: boolean;
  
  constructor(private route: ActivatedRoute, private aqiService: AqiService) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.state = params['state'];
    this.loading = true;
    this.aqiService.getCities(this.state, this.country).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      this.loading = false;
      this.cities = res
    }, err => {
      this.error = true;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
