import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ModalService} from '../../../../_modal';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../../services/users.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'emailsAdd',
  templateUrl: './emails-add.component.html',
  styleUrls: ['./emails-add.component.css']
})
export class EmailsAddComponent implements OnInit {

  @Output() mes = new EventEmitter();
  emails = [];
  email = '';

  title = 'Сохранение элемента';
  element = 'email';

  message = '';

  st = 0;
  arr: any;

  constructor(public translate: TranslateService, public modalServ: ModalService, private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {
  }

  saveEmail() {
    //this.emails = localStorage.getItem('email').split(' ');
    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.arr = data;
        for (let i = 0; i < this.arr.length; i++) {
          this.emails.push(this.arr[i].email);
        }
        if (this.emails.includes(this.email)) {
          this.st = 2;
          this.message = 'Данный email уже существует';
          this.openModal('alert-dialog-add-email', this.message);
          this.closeModal('add-email');
        } else {

          this.usersService.postAddEmail(localStorage.getItem('ip'), this.email).subscribe(res => {
            console.log('Запись удачно изменена');
          }, error => {
            console.log(error);
          });

          this.st = 1;
          this.message = 'Email успешно сохранён';
          this.openModal('alert-dialog-add-email', this.message);
          this.closeModal('add-email');

          this.email = '';
          this.mes.emit(this.email);
          this.closeModal('add-email');
        }
        this.emails = [];
      });
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  openModal(id: string, mes) {
    this.modalServ.open(id);
    this.message = mes;
  }

}
