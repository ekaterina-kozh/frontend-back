import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeposComponent } from './all-depos.component';

describe('AllDeposComponent', () => {
  let component: AllDeposComponent;
  let fixture: ComponentFixture<AllDeposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDeposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDeposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
