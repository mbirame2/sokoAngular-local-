import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovendreComponent } from './covendre.component';

describe('CovendreComponent', () => {
  let component: CovendreComponent;
  let fixture: ComponentFixture<CovendreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovendreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
