import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../_modal';
import date from '../../../../date.json';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  phones: any = [];
  emails: any = [];
  phone: string = '';
  email: string = '';
  date: any = {};

  constructor(public translate: TranslateService, public modalServ: ModalService, private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {

    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.emails = data[0].email;
      }
    );

    this.usersService.getPhones(localStorage.getItem('ip')).subscribe(
      data => {
        this.phones = data[0].phone;
        //console.log(this.phones);
      }
    );
 }

  openModal(id: string) {
    this.modalServ.open(id);
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  emails_get(value: any) {
    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.emails = data[0].email;
      }
    );
  }

  phones_get(value: any) {
    this.usersService.getPhones(localStorage.getItem('ip')).subscribe(
      data => {
        this.phones = data[0].phone;
      }
    );
  }
}
