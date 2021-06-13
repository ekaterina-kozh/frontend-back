import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsEditComponent } from './emails-edit.component';

describe('EmailsEditComponent', () => {
  let component: EmailsEditComponent;
  let fixture: ComponentFixture<EmailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
