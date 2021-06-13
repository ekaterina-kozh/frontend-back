import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPerComponent } from './stat-per.component';

describe('StatPerComponent', () => {
  let component: StatPerComponent;
  let fixture: ComponentFixture<StatPerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatPerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
