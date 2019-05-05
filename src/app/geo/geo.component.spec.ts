import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GeoComponent } from './geo.component';

describe('GeoComponent', () => {
  let component: GeoComponent;
  let fixture: ComponentFixture<GeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
