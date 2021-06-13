import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../_modal';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-langulage',
  templateUrl: './langulage.component.html',
  styleUrls: ['./langulage.component.css']
})
export class LangulageComponent implements OnInit {

  @Output() mes = new EventEmitter();

  languages = [['Русский', 'ru'], ['Беларускі', 'by'], ['English', 'en']];

  language;

  constructor(public translate: TranslateService, public modalServ: ModalService, private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {
    //this.language = localStorage.getItem('language');
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i][1] == localStorage.getItem('language')){
        this.language = this.languages[i][0];
      }
    }
  }

  changeLanguage(item: any) {
    this.language = item[0];
    this.mes.emit(item);
    localStorage.setItem('language', item[1]);
    this.usersService.postSettingOther(localStorage.getItem('language'), localStorage.getItem('theme'), localStorage.getItem('ip')).subscribe(res => {
    }, error => {
      console.log(error);
    });
    //window.location.reload();
  }
}
