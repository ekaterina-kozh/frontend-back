import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalService} from '../../_modal';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {
  title = 'testpr';

  language = 'ru';

  obj: any = [];

  answers: any = [];
  leng = 0;
  answer = '';

  // tslint:disable-next-line:variable-name
  last_action = '';

  num = 0;

  input = '';

  card = '';

  balans: any = [];

  curs: any = [];

  values_ru =
    {
      transfer: 'Сделай перевод',
      mobile: 'Оплати мобильный телефон',
      balans: 'Покажи баланс',
      curs: 'Какой сейчас курс валют?',
      weather: 'Какая погода?',
      isday: 'Какой сегодня день?',
      time: 'Часы работы банка',
      error: 'Проверьте правильность введенного вами сообщения',
      hello: 'Здравствуйте, я бот мобильного приложения БелВЭБ банка. Чем я могу помочь? (Нужно выбрать ответ)',
      transfer_answer: 'Хорошо, делаем перевод. Введите номер карты получателя и сумму перевода. (Через пробел)',
      mobile_answer: 'Отлично, давайте пополним счет телефона. Введите номер телефона и сумму пополнения.',
      balans_answer: 'Это ваш текущий баланс: ',
      curs_answer1: 'Курс валют на ',
      curs_answer2: 'Доллар',
      curs_answer3: 'Евро',
      curs_answer4: 'Покупка',
      curs_answer5: 'Продажа',
      weather_answer: 'Какой город вас интересует?',
      success: 'Операция прошла успешно!',
      weather1: 'Погода на сегодня:',
      in: 'в',
      temp: 'градусов',
      input: 'Написать ответ боту'
    };

  values_en =
    {
      transfer: 'Make a transfer',
      mobile: 'Pay for a mobile phone',
      balans: 'Show the balance',
      curs: 'What is the current exchange rate?',
      weather: 'What\'s the weather like?',
      isday: 'What day is it today?',
      time: 'Bank opening hours',
      error: 'Check that the message you entered is correct',
      hello: 'Hello, I\'m a bot of the BelVEB Bank mobile app. How can I help you? (You need to choose the answer)',
      transfer_answer: 'OK, we\'re making the transfer. Enter the recipient\'s card number and the transfer amount. (Separated by a space)',
      mobile_answer: 'Great, let\'s top up the phone bill. Enter your phone number and deposit amount.',
      balans_answer: 'This is your current balance:',
      curs_answer1: 'Exchange rate on ',
      curs_answer2: 'Dollar',
      curs_answer3: 'Euro',
      curs_answer4: 'Purchase',
      curs_answer5: 'Sale',
      weather_answer: 'Which city are you interested in?',
      success: 'The operation was successful!',
      weather1: 'Today\'s weather:',
      in: 'in',
      temp: 'degrees',
      input: 'Write a response to the bot'
    };

  values_bel =
    {
      transfer: 'Зрабі пераклад',
      mobile: 'Аплаці мабільны тэлефон',
      balans: 'Пакажы баланс',
      curs: 'Які цяпер курс валют?',
      weather: 'Якое надвор\'е?',
      isday: 'Які сёння дзень?',
      time: 'Гадзіны працы банка',
      error: 'Праверце правільнасць уведзенага вамі паведамлення',
      hello: 'Добры дзень, я бот мабільнага прыкладання БелВЭБ банка. Чым я магу дапамагчы? (Трэба выбраць адказ)',
      transfer_answer: 'Добра, робім пераклад. Калі ласка, увядзіце нумар карты атрымальніка і суму перакладу. (Праз прабел)',
      mobile_answer: 'выдатна, Давайце папоўнім рахунак тэлефона. Калі ласка, увядзіце нумар тэлефона і суму папаўнення.',
      balans_answer: ' Гэта ваш бягучы баланс:',
      curs_answer1: 'Курс валют на',
      curs_answer2: 'Долар',
      curs_answer3: 'Еўра',
      curs_answer4: 'Купля',
      curs_answer5: 'Продаж',
      weather_answer: 'Які горад вас цікавіць?',
      success: 'Аперацыя прайшла паспяхова!',
      weather1: 'Надвор\'е на сёння:',
      in: 'y',
      temp: 'градусаў',
      input: 'Напісаць адказ боту'
    };

  day = '';

  time = '';

  weather: any = [];

  constructor(public router: Router, public modalServ: ModalService, private usersService: UsersService) {
  }

  ngOnInit(): void {
    switch (localStorage.getItem('language')) {
      case 'ru':
        this.obj = this.values_ru;
        break;
      case 'en':
        this.obj = this.values_en;
        break;
      case 'by':
        this.obj = this.values_bel;
    }
    this.answers = document.getElementById('answers');
    this.answers.append(document.getElementById('first-quas'));
    this.answers.append(document.getElementById('select'));

    this.usersService.getCard(localStorage.getItem('ip')).subscribe(
      data => {
        this.balans = data;
        this.card = this.balans[0].id;
      }
    );

    this.usersService.getOtherCurs().subscribe(
      data => {
        this.curs = data;
      }
    );

    this.usersService.getOtherTime().subscribe(
      data => {
        this.time = data[0];
      }
    );
    this.usersService.getOtherDay().subscribe(
      data => {
        this.day = data[0];
      }
    );


  }

  changeCity(value: string, str) {
    this.last_action = value;

    let answer = document.createElement('div');
    answer.className = 'message answer ready';
    answer.innerHTML = str;

    this.answers.append(answer);

    let loading = document.getElementById('loading');
    loading.setAttribute('style', 'display: table');
    let quas = document.createElement('div');
    quas.className = 'message question ready';
    this.answers.append(loading);

    switch (value) {
      case 'transfer':
        document.getElementById('input-text').setAttribute('placeholder', 'XXXXXXXXXXXXXXXX X.XX');
        this.timeAction(quas, this.obj.transfer_answer, true);
        break;
      case 'mobile':
        document.getElementById('input-text').setAttribute('placeholder', '+XXXXXXXXXXXX X.XX');
        this.timeAction(quas, this.obj.mobile_answer, true);
        break;
      case 'balans':
        document.getElementById('input-text').setAttribute('style', 'display: none');
        let str1 = '<h5>' + this.obj.balans_answer + '</h5>';
        for (let i = 0; i < this.balans.length; i++) {
          str1 += '<p><i>**** ' + this.balans[i].num.substr(-4) + '</i>  ';
          str1 += '<b>' + this.balans[i].sum + ' BY</b></p>';
        }
        this.timeAction(quas, str1);
        break;
      case 'curs':
        document.getElementById('input-text').setAttribute('style', 'display: none');
        let str2 = '<h5>' + this.obj.curs_answer1 + ' ' + this.curs[0].dollar[4] + '</h5>';
        str2 += '<h6>' + this.obj.curs_answer2 + '</h6>';
        str2 += '<p><i>' + this.obj.curs_answer4 + '</i><b>' + this.curs[0].dollar[1] + '</b></p>';
        str2 += '<p><i>' + this.obj.curs_answer5 + '</i><b>' + this.curs[0].dollar[2] + '</b></p>';
        str2 += '<h6>' + this.obj.curs_answer3 + '</h6>';
        str2 += '<p><i>' + this.obj.curs_answer4 + '</i><b>' + this.curs[0].evro[1] + '</b></p>';
        str2 += '<p><i>' + this.obj.curs_answer5 + '</i><b>' + this.curs[0].evro[2] + '</b></p>';
        this.timeAction(quas, str2);
        break;
      case 'weather':
        document.getElementById('input-text').setAttribute('placeholder', this.obj.input);
        this.timeAction(quas, this.obj.weather_answer, true);
        break;
      case 'isday':
        document.getElementById('input-text').setAttribute('style', 'display: none');
        this.timeAction(quas, this.day);
        break;
      case 'time':
        document.getElementById('input-text').setAttribute('style', 'display: none');
        this.timeAction(quas, this.time);
        break;
    }
  }

  timeAction(quas: any, str: string, st = false): void {
    quas.innerHTML = str;
    setTimeout(() => {
      this.answers.append(quas);
      this.answers.append(document.getElementById('select'));
      if (st) {
        document.getElementById('input-text').setAttribute('style', 'display: block');
      }
    }, 3500);
  }

  inputValue(e: any) {
    if (e.code === 'Enter') {
      document.getElementById('input-text').setAttribute('style', 'display: none');
      let quas = document.createElement('div');
      quas.className = 'message question ready';

      switch (this.last_action) {
        case 'transfer':
          let arr1 = this.input.split('');
          let err1 = true;
          for (let i = 0; i < arr1.length; i++) {
            if (i <= 15) {
              if (isNaN(parseFloat(arr1[i]))) {
                err1 = true;
              } else {
                err1 = false;
              }
            }
          }
          if (this.input.length < 18 || this.input[16] !== ' ' || err1) {
            quas.innerHTML = this.obj.error;
          } else {
            //tut server
            this.usersService.postTranfer(this.card,
              this.input.split(' ')[0], this.input.split(' ')[1]).subscribe();
            quas.innerHTML = this.obj.success;
            this.input = '';
          }
          this.answers.append(quas);
          this.answers.append(document.getElementById('select'));
          break;
        case 'mobile':
          let arr = this.input.split('');
          let err = true; //error is
          for (let i = 0; i < arr.length; i++) {
            if (i > 0 && i <= 13) {
              if (isNaN(parseFloat(arr[i]))) {
                err = true;
              } else {
                err = false;
              }
            }
            if (arr[0] !== '+') {
              err = true;
            } else {
              err = false;
            }
          }
          if (this.input.length < 15 || this.input[13] !== ' ' || err) {
            quas.innerHTML = this.obj.error;
          } else {
            //tut server
            this.usersService.postMobile(this.input.split(' ')[0], this.card, this.input.split(' ')[1]).subscribe();
            quas.innerHTML = this.obj.success;
            this.input = '';
          }
          this.answers.append(quas);
          this.answers.append(document.getElementById('select'));
          break;
        case 'weather':
          if (this.input.length < 2) {
            quas.innerHTML = this.obj.error;
          } else {
            //tut server

            this.usersService.getWeather(this.input).subscribe(
              data => {
                this.weather = data;
              }
            );
            quas.innerHTML = '<h5>' + this.obj.weather1 + ' </h5>' + this.obj.in + ' ' + this.input + ' ' + Math.round(this.weather.main.temp - 273) + ' ' + this.obj.temp;
          }
          this.answers.append(quas);
          this.answers.append(document.getElementById('select'));
          this.input = '';
          break;
      }
    }
  }

}
