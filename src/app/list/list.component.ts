import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // id: any;

  constructor(
    // public auth: AuthService
  ) { }

  ngOnInit() {
    // if (this.auth.userProfile) {
    //   this.id = this.auth.userProfile;
    //   console.log(this.id);
    // } else {
    //   this.auth.getProfile((err, profile) => {
    //     this.id = profile;
    //     console.log(profile);
    //   });
    // }
  }

}
