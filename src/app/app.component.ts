import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobile: boolean;

  constructor(public auth: AuthService, 
    private router: Router) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.renewTokens();
    }
    this.checkIfMobile();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    (document.body.offsetWidth <= 800) ? this.mobile = true : this.mobile = false;    
  }

}