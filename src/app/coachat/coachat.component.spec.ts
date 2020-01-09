import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachatComponent } from './coachat.component';

describe('CoachatComponent', () => {
  let component: CoachatComponent;
  let fixture: ComponentFixture<CoachatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
