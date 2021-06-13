import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafKeyComponent } from './graf-key.component';

describe('GrafKeyComponent', () => {
  let component: GrafKeyComponent;
  let fixture: ComponentFixture<GrafKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
