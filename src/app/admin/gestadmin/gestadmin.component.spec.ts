import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestadminComponent } from './gestadmin.component';

describe('GestadminComponent', () => {
  let component: GestadminComponent;
  let fixture: ComponentFixture<GestadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
