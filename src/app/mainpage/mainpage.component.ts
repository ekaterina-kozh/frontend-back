import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';
import set = Reflect.set;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  value = false;
  login = '';
  password = '';

  ans: any;
  id: any;

  constructor(public translate: TranslateService,
              private usersService: UsersService,
              public router: Router) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {
  }

  changeType() {
    this.value = !this.value;
    if (this.value) {
      document.getElementById('password').setAttribute('type', 'text');
    } else {
      document.getElementById('password').setAttribute('type', 'password');
    }
  }

  saveData() {
    let ip = localStorage.getItem('ip');
    if (this.login === '' || this.password === '') {
      this.ans = 0;
    } else {
      this.usersService.postId(this.login, this.password).subscribe(
        data => {
          this.id = data[0][0].id;
          if (this.id == '0') {
            this.ans = 1;
          } else {
            this.ans = 2;
            this.usersService.postData(ip, this.id).subscribe(res => {
              console.log('Запись удачно изменена');
            }, error => {
              console.log(error);
            });
            setTimeout(() => {
              this.router.navigate(['lock/check']);
            }, 500);
          }
        });
    }
  }
}
