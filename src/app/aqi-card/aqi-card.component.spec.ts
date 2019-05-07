import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiCardComponent } from './aqi-card.component';

describe('AqiCardComponent', () => {
  let component: AqiCardComponent;
  let fixture: ComponentFixture<AqiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AqiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AqiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
