import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangulageComponent } from './langulage.component';

describe('LangulageComponent', () => {
  let component: LangulageComponent;
  let fixture: ComponentFixture<LangulageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangulageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangulageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
