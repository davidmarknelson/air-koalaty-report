import { Component, OnInit, HostListener } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-indexscale',
  templateUrl: './indexscale.component.html',
  styleUrls: ['./indexscale.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexscaleComponent implements OnInit {
  good: string = 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
  moderate: string = 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
  sensitive: string = 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
  unhealthy: string = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
  veryUnhealthy: string ='Health warnings of emergency conditions. The entire population is more likely to be affected.';
  hazardous: string = 'Health alert: everyone may experience more serious health effects.';
  mobile: boolean;
  placementMiddle: string;
  placementRight: string;
  placementLeft: string;


  constructor() { }

  ngOnInit() {
    this.checkIfMobile();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    if (document.body.offsetWidth <= 767) {
      this.placementRight = 'top-left';
      this.placementMiddle = 'top';
      this.placementLeft = 'top-right';
      this.mobile = true;
    } else {
      this.placementRight = 'left';
      this.placementMiddle = 'left';
      this.placementLeft = 'left';
      this.mobile = false;
    }
  }

}
