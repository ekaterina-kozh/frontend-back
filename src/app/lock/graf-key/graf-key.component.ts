import {Component, OnInit, Output} from '@angular/core';
import * as PatternLock from '../../../assets/patternlock.js';
import {ModalService} from '../../_modal';
import {ActivatedRoute, Router} from '@angular/router';
import {EventEmitter} from '@angular/core';
import set = Reflect.set;
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../services/users.service';


@Component({
  selector: 'app-graf-key',
  templateUrl: './graf-key.component.html',
  styleUrls: ['./graf-key.component.css']
})
export class GrafKeyComponent implements OnInit {

  message = 'Неверный пароль';
  public result = null;
  arr;

  arr1: any = [];
  arr2: any = [];

  st = 'check';

  text = '';

  status = 0;

  count = 0;

  grafval;


  @Output() checkkey = new EventEmitter();

  constructor(public translate: TranslateService, public modalServ: ModalService,
              public router: Router,
              public router1: ActivatedRoute,
              private usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {
    /*if lock is graf key*/
    this.st = this.router1.snapshot.params['st'];
    let elements = [];
    const e = document.getElementById('lock');

    this.usersService.getSetting(localStorage.getItem('ip')).subscribe(
      data => {
        this.grafval = data[0].graf;
      });

    if (this.st == 'new') {
      this.status = 3;
    }

    const p = new PatternLock(e, {
      // tslint:disable-next-line:typedef
      onPattern: () => {
        this.arr = document.querySelector('#lock > g.lock-actives').children;
        for (let i = 0; i < this.arr.length; i++) {
          elements.push([this.arr[i].getAttribute('cx'), this.arr[i].getAttribute('cy')]);
        }


        if (this.st == 'new') {
          if (elements.length != 0) {
           // console.log(elements.toString());
            this.count = 1;
            this.st = 'save';
          }
        }


        if (elements.length != 0 && this.st != 'new') {
          //document.getElementById('mw').innerHTML = elements.toString();
          if (elements.toString() == this.grafval && this.st != 'save') {
            if (this.st == 'check') {
              this.status = 1;
              this.text = 'Ключи совпадают';
              setTimeout(() => {
                this.router.navigate(['home']);
              }, 1000);
            }
            if (this.st == 'change') {
              this.status = 3;
              this.text = 'Введите новый ключ';
              this.st = 'save';
            }

          } else if (elements.toString() != this.grafval && this.st != 'save') {
            this.status = 2;
            this.text = 'Ключи не совпадают';
          }
        }

        if (this.st == 'save') {

          if (this.count == 1) {
            this.status = 4;
            this.text = 'Повторите ввод нового ключа';
            this.arr1 = elements;
          }
          if (this.count == 2) {
            this.count = 0;
            this.arr2 = elements;
            if (this.arr1.toString() == this.arr2.toString()) {
              /*localStorage.setItem('graf', this.arr1.toString());
              localStorage.setItem('pin', '');*/
              const ip = localStorage.getItem('ip');
              this.usersService.postSetting('', this.arr1.toString(), ip).subscribe(res => {
                console.log('Запись удачно изменена');
              }, error => {
                console.log(error);
              });
              this.status = 5;
              this.text = 'Новый ключ сохранен';
              setTimeout(() => {
                this.router.navigate(['home']);
              }, 1000);
            } else if (this.arr1 != this.arr2) {
              this.status = 2;
              this.text = 'Ключи не совпадают';
            }
          }
         // console.log(this.count);
          this.count += 1;
        }

        elements = [];
      },
    });
  }


  closeModal(id: string) {
    this.modalServ.close(id);
  }

  openModal(id: string) {
    this.modalServ.open(id);
  }
}
