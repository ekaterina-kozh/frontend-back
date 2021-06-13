import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcStComponent } from './ac-st.component';

describe('AcStComponent', () => {
  let component: AcStComponent;
  let fixture: ComponentFixture<AcStComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcStComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
