import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../_modal';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  language;

  pin_l;
  graf_l;
  languages = [['Русский', 'ru'], ['Беларускі', 'by'], ['English', 'en']];
  ch = false;

  password = '';
  pass = '';
  login = '';

  ch1;
  ch2;

  log;

  constructor(public translate: TranslateService, public modalServ: ModalService, public usersService: UsersService) {
    this.translate.setDefaultLang('ru');

  }

  ngOnInit(): void {
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i][1] === localStorage.getItem('language')) {
        this.language = this.languages[i][0];
      }
    }

    const value = localStorage.getItem('theme');
    if (value === 'dark-theme') {
      this.ch = true;
    } else {
      this.ch = false;
    }

  }

  openModal(id: string) {
    this.modalServ.open(id);
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  answer(str: any) {
    this.language = str[0];
    this.translate.use(str[1]);
  }

  onChange() {
    const value = localStorage.getItem('theme');
    if (value == 'dark-theme') {
      localStorage.setItem('theme', 'light-theme');
    } else {
      localStorage.setItem('theme', 'dark-theme');
    }
    this.usersService.postSettingOther(localStorage.getItem('language'), localStorage.getItem('theme'), localStorage.getItem('ip')).subscribe(res => {
    }, error => {
      console.log(error);
    });
    document.querySelector('body').setAttribute('class', 'all ' + localStorage.getItem('theme'));
  }

  pkWin() {
    this.usersService.getSetting(localStorage.getItem('ip')).subscribe(
      data => {
        this.ch2 = Boolean(data[0].pin.length);
        this.ch1 = Boolean(data[0].graf.length);
        this.pin_l = data[0].pin.length;
        this.graf_l = data[0].graf.length;
      }
    );
    this.openModal('pk');
  }

  pasWin() {
    this.usersService.getSdata(localStorage.getItem('ip')).subscribe(
      data => {
        this.pass = data[0].password;
        this.log = data[0].login;
      });
    this.openModal('change-password');
  }

  pasLgWin() {
    this.usersService.getSdata(localStorage.getItem('ip')).subscribe(
      data => {
        this.login = data[0].login;
        this.password = data[0].password;
      });
    this.openModal('change-login');
  }
}
