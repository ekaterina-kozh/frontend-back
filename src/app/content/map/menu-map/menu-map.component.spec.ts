import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMapComponent } from './menu-map.component';

describe('MenuMapComponent', () => {
  let component: MenuMapComponent;
  let fixture: ComponentFixture<MenuMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
