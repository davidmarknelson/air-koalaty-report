import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  id: any;
  test: any;
  cities: any;

  constructor(public auth: AuthService, private user: UserService) { }

  ngOnInit() {
    // if statement never fires. WHY?
    if (this.auth.userProfile) {
      this.id = this.auth.userProfile;
      console.log('use rprofile',this.id);
    } else {
      this.auth.getProfile((err, profile) => {
        this.id = profile.sub;
        this.user.getCityList(this.id).subscribe(res => {
          this.test = res;
          this.cities = res.cities;
          console.log(this.test);
        });
        console.log('get profile', profile);
      });
    }
  }

}
