import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AqiService } from '../../services/aqi/aqi.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  country: any;
  state: any;
  cities: Array<object>;
  
  constructor(private route: ActivatedRoute, private aqiService: AqiService) { }

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.country = params['country'];
    this.state = params['state'];
    this.aqiService.getCities(this.state, this.country).subscribe(res => this.cities = res.data);
  }

}
