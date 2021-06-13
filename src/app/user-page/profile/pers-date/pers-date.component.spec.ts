import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersDateComponent } from './pers-date.component';

describe('PersDateComponent', () => {
  let component: PersDateComponent;
  let fixture: ComponentFixture<PersDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
