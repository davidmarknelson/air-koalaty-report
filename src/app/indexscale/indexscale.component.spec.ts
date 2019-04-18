import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexscaleComponent } from './indexscale.component';

describe('IndexscaleComponent', () => {
  let component: IndexscaleComponent;
  let fixture: ComponentFixture<IndexscaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexscaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
