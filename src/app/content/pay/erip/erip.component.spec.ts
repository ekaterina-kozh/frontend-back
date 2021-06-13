import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EripComponent } from './erip.component';

describe('EripComponent', () => {
  let component: EripComponent;
  let fixture: ComponentFixture<EripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
