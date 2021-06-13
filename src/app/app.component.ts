import {Component, OnInit} from '@angular/core';
import date from '../../date.json';
import setting from '../../setting.json';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from './services/users.service';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'belWeb';
  answer: any;

  constructor(public translate: TranslateService,
              private usersService: UsersService,
              public router: Router
  ) {
  }

  ngOnInit(): void {

    this.getIP();

    this.usersService.getSetting(localStorage.getItem('ip')).subscribe(
      data => {
        if (data[0] === undefined) {
          localStorage.setItem('theme', 'light-theme');
          localStorage.setItem('language', 'ru');
        } else {
          localStorage.setItem('theme', data[0].theme);
          localStorage.setItem('language', data[0].language);
        }
      });

    document.querySelector('body').setAttribute('class', 'all ' + localStorage.getItem('theme'));
  }

  getIP() {
    this.usersService.getIPAddress().subscribe(
      data => {
        localStorage.setItem('ip', data.ip);
        this.usersService.postIp(data.ip).subscribe(
          data2 => {
            this.answer = data2[0];
            if (this.answer[0].answer === 'user exists') {
              this.router.navigate(['lock/check']);
            } else {
              this.router.navigate(['auth']);
            }
          });
      });
  }
}
