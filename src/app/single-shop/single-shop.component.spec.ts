import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShopComponent } from './single-shop.component';

describe('SingleShopComponent', () => {
  let component: SingleShopComponent;
  let fixture: ComponentFixture<SingleShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
