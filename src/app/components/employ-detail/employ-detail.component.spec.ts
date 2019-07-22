import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployDetailComponent } from './employ-detail.component';

describe('EmployDetailComponent', () => {
  let component: EmployDetailComponent;
  let fixture: ComponentFixture<EmployDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
