import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../_modal';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-pers-date',
  templateUrl: './pers-date.component.html',
  styleUrls: ['./pers-date.component.css']
})
export class PersDateComponent implements OnInit {

  date: any;
  lastname = '';
  firstname = '';
  // tslint:disable-next-line:variable-name
  middle_name = '';
  type_cl = '';
  address = '';
  i_n = '';
  s_n_p = '';
  kv = '';
  data_v = '';

  constructor(public translate: TranslateService, public modalServ: ModalService, private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {

    this.usersService.getUsersData(localStorage.getItem('ip')).subscribe(
      data => {
        this.lastname = data[0].lastname;
        this.firstname = data[0].firstname;
        this.middle_name = data[0].middle_name;
        this.type_cl = data[0].type_cl;
        this.address = data[0].address;
        //console.log(data[0]);
      }
    );

    this.usersService.getDocuments(localStorage.getItem('ip')).subscribe(
      data => {
        //this.date = data[0];
        this.i_n = data[0].i_n;
        this.s_n_p = data[0].s_n_p;
        this.kv = data[0].kv;
        this.data_v = data[0].data_v;
      }
    );
    this.date = JSON.parse(localStorage.getItem('model'));
  }

}
