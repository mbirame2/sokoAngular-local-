import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourremboComponent } from './retourrembo.component';

describe('RetourremboComponent', () => {
  let component: RetourremboComponent;
  let fixture: ComponentFixture<RetourremboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetourremboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetourremboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
