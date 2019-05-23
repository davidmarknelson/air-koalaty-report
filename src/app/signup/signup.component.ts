import { Component, OnInit } from '@angular/core';
// Services
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
