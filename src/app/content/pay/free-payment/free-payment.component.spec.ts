import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreePaymentComponent } from './free-payment.component';

describe('FreePaymentComponent', () => {
  let component: FreePaymentComponent;
  let fixture: ComponentFixture<FreePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
