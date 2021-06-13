import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../_modal';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  title = 'Для входа в приложение введите пин-код';

  // tslint:disable-next-line:variable-name
  key_arr: any = [];
  text = '';
  st = 'check';

  arr1: any = [];
  arr2: any = [];

  status = 0;

  count = 0;
  pinval;

  constructor(public translate: TranslateService, public modalServ: ModalService,
              public router: Router,
              public router1: ActivatedRoute,
              private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {
    this.st = this.router1.snapshot.params['st'];
    //console.log(this.st);
    this.usersService.getSetting(localStorage.getItem('ip')).subscribe(
      data => {
        this.pinval = data[0].pin;
      });

    if (this.st == 'change') {
      this.title = 'Введите существующий пин код';
    } else {
      this.title = 'Для входа в приложение введите пин-код';
    }
    if (this.st == 'new') {
      this.status = 3;
      //this.st = 'save';
    }
  }

  pushkey(num: number) {

    this.text = '';
    this.key_arr.push(num);
    //console.log(this.key_arr);

    if (this.st == 'new') {
      if (this.key_arr.length != 0) {
        //console.log(this.key_arr.toString());
        this.count = 1;
        this.st = 'save';
      }
    }

    if (this.key_arr.length == 5 && this.st != 'new') {
      if (this.key_arr.toString() == this.pinval && this.st != 'save') {
        if (this.st == 'check') {
          this.status = 1;
          this.text = 'Пин-код введён верно';
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 1000);
        }
        if (this.st == 'change') {
          this.text = 'Введите новый пин-код';
          this.status = 3;
          this.st = 'save';
        }
      } else if (this.key_arr.toString() != this.pinval && this.st != 'save') {
        this.status = 2;
        this.text = 'Пин-коды не совпадают';
      }

      if (this.st == 'save') {

        if (this.count == 1) {
          this.status = 4;
          this.text = 'Повторите ввод нового пин-кода';
          this.arr1 = this.key_arr;
        }
        if (this.count == 2) {
          this.count = 0;
          this.arr2 = this.key_arr;
          if (this.arr1.toString() == this.arr2.toString()) {
            /*localStorage.setItem('pin', this.arr1.toString());
            localStorage.setItem('graf', '');*/
            const ip = localStorage.getItem('ip');
            this.usersService.postSetting(this.arr1.toString(), '', ip).subscribe(res => {
              console.log('Запись удачно изменена');
            }, error => {
              console.log(error);
            });
            this.status = 5;
            this.text = 'Новый пин код сохранен';
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 1000);
          } else if (this.arr1 != this.arr2) {
            this.status = 2;
            this.text = 'Пин-коды не совпадают';
          }
        }
        this.count += 1;
      }

      this.cleen();
      this.key_arr = [];

    }
    document.querySelector('div.key-area > div.key').setAttribute('class', 'key-active');
    //document.querySelector('body > app-root > app-pin > div > div > div.key-area > div').setAttribute('class', 'key-active');//}
  }

  cleen() {
    setTimeout(() => {
      const arr = document.querySelectorAll('div.key-area > div.key-active');
      for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute('class', 'key');
      }
    }, 500);
  }

  delkey() {
    if (this.key_arr.length != 0) {
      this.key_arr.pop();
      const arr = document.querySelectorAll('div.key-area > div.key-active');
      arr[arr.length - 1].setAttribute('class', 'key');
    }
  }
}
