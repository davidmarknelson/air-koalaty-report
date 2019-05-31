import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Interfaces
import { States } from '../../services/aqi/states';
// Services
import { AqiService } from '../../services/aqi/aqi.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  country: string;
  states: States;
  error: boolean;
  loading: boolean;

  constructor(private route: ActivatedRoute, private aqiService: AqiService) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.loading = true;
    this.aqiService.getStates(this.country).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      this.loading = false;
      this.states = res
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
