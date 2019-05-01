import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddComponent } from './list-add.component';

describe('ListAddComponent', () => {
  let component: ListAddComponent;
  let fixture: ComponentFixture<ListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
