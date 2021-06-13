import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsAddComponent } from './emails-add.component';

describe('EmailsAddComponent', () => {
  let component: EmailsAddComponent;
  let fixture: ComponentFixture<EmailsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
