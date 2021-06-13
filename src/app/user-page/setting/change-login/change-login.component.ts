import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../_modal';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.css']
})
export class ChangeLoginComponent implements OnInit {
  login = '';
  password = '';

  @Input() login2 = '';
  @Input() password2 = '';

  message = '';

  st = false;

  value = false; //type pass

  constructor(public translate: TranslateService, public modalServ: ModalService, private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {
  }

  saveLogin() {
    if (this.password2 === this.password) {
      this.message = '';
      this.usersService.postSdata(this.login, this.password, localStorage.getItem('ip')).subscribe(res => {
        console.log('Запись удачно изменена');
      }, error => {
        console.log(error);
      });
      this.openModal('alert-dialog-success');
      this.closeModal('change-login');
    } else {
      this.st = !this.st;
    }
  }

  changeType() {
    this.value = !this.value;
    if (this.value) {
      document.getElementById('pass').setAttribute('type', 'text');
    } else {
      document.getElementById('pass').setAttribute('type', 'password');
    }
  }

  openModal(id: string) {
    this.modalServ.open(id);
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }


}
