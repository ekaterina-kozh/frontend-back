import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalService} from '../../../_modal';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  @Input() email = '';
  @Output() get_emails = new EventEmitter();

  emails: any;
  index = 0;
  value;
  item;
  message = 'Email успешно изменён';
  get_answer = false;
  title = 'Удаление элемента';
  element = 'email';

  el;
  id;

  constructor(public translate: TranslateService, public modalServ: ModalService, private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {
    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.emails = data;
      }
    );
    this.get_emails.emit(this.emails);
  }

  openModal(id: string, email) {
    this.modalServ.open(id);
    this.email = email;
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  deleteEmail(item: any) {
    this.openModal('warning-delete-email', '');
    this.closeModal('custom-modal-3');
    this.item = item;
  }

  AddEmail(str: any) {
    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.emails = data;
      }
    );
  }

  EditEmail(str: any) {
    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.emails = data;
      }
    );
  }

  answer(str: any) {
    /*delete element*/
    //.log(this.item.id);
    this.get_answer = str;
    if (this.get_answer) {
      this.index = this.emails.indexOf(this.item);
      this.emails.splice(this.index, 1);

      this.usersService.postDeleteEmail(this.item.id).subscribe(res => {
        console.log('Запись удачно изменена');
      }, error => {
        console.log(error);
      });

      this.index = 0;
      this.message = 'Email успешно удалён';
      this.get_emails.emit(this.emails[0].email);
      this.openModal('alert-dialog-delete-email', this.message);
      this.closeModal('edit-email');
    }
  }

  clikElem(item: any) {
    this.openModal('edit-email', item);
    this.closeModal('custom-modal-3');
    this.id = item.id;
    this.email = item.email;
    this.el = item;
  }
}
