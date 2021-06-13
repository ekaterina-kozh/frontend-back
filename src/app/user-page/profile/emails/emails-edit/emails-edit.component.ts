import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../../_modal';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../../services/users.service';

@Component({
  selector: 'app-emails-edit',
  templateUrl: './emails-edit.component.html',
  styleUrls: ['./emails-edit.component.css']
})
export class EmailsEditComponent implements OnInit {

  @Output() mes = new EventEmitter();
  emails = [];
  @Input() email;
  @Input() index;
  @Input() element2: any;

  title = 'Изменение элемента';
  element = 'email';
  message = '';
  st = 0;

  arr: any;

  get_answer = false;

  constructor(public translate: TranslateService, public modalServ: ModalService, private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {
  }

  editEmail() {
    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.arr = data;
        for (let i = 0; i < this.arr.length; i++) {
          this.emails.push(this.arr[i].email);
        }
        if (this.emails.includes(this.email)) {
          this.st = 2;
          this.message = 'Данный email уже существует';
          this.openModal('alert-dialog-edit-email', this.message);
          this.closeModal('edit-email');
        } else {
          this.openModal('warning-edit-email', this.message);
          this.closeModal('edit-email');
        }
        this.emails = [];
      }
    );
  }

  openModal(id: string, mes) {
    this.modalServ.open(id);
    this.message = mes;
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  answer(str: any) {
    this.get_answer = str;
    if (this.get_answer) {

      this.usersService.postEditEmail(this.email, this.index).subscribe(res => {
        console.log('Запись удачно изменена');
      }, error => {
        console.log(error);
      });

      this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
        data => {
          this.arr = data;
          for (let i = 0; i < this.arr.length; i++) {
            this.emails.push(this.arr[i].email);
          }
          //console.log(this.emails, this.email, this.index);
          if (this.emails.includes(this.email)) {

            this.mes.emit(this.email);

            this.st = 1;
            this.message = 'Email успешно изменён';
            this.openModal('alert-dialog-edit-email', this.message);
            this.closeModal('edit-email');
          }
          this.emails = [];
        });
    }
  }

}
