import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsartComponent } from './detailsart.component';

describe('DetailsartComponent', () => {
  let component: DetailsartComponent;
  let fixture: ComponentFixture<DetailsartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
