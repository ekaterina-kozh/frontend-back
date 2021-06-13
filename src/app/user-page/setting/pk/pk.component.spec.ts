import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PkComponent } from './pk.component';

describe('PkComponent', () => {
  let component: PkComponent;
  let fixture: ComponentFixture<PkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
