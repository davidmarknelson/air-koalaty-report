import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

class MockRouter {
  navigate(path) {}
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ MatToolbarModule ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navbar', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have a button with the website title shortened', () => {
      const button = fixture.debugElement.query(By.css('[data-test=brand-button]'));
      expect(button.nativeElement.innerText).toEqual('KOALAty');
    });

    it('should have the first that links to the home page', () => {
      const link = fixture.debugElement.query(By.css('mat-toolbar > a'));
      expect(link.attributes.routerLink).toEqual('');
    });
  });

});
