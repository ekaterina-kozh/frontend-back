import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mobile-payment',
  templateUrl: './mobile-payment.component.html',
  styleUrls: ['./mobile-payment.component.css']
})
export class MobilePaymentComponent implements OnInit {

  cards: any = [];
  value1 = '';
  value3 = '';
  card = '';

  err = 0;
  selectedValue: string;

  constructor(private usersService: UsersService, public router: Router) {
    this.usersService.getCards(localStorage.getItem('ip')).subscribe(
      data => {
        this.cards = data;
        this.selectedValue = this.cards[0].num;
      });
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['home']);
  }

  _keyUp(e: any) {
    console.log(e.keyCode);
    const key = e.charCode || e.keyCode || 0;

    // Разрешаем backspace, tab, delete, стрелки, обычные цифры и цифры на дополнительной клавиатуре
    return (
      key === 8 ||
      key === 9 ||
      key === 46 ||
      key === 190 ||
      (key >= 37 && key <= 40) ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105));
  }

  _keyUp1(e: any) {
    console.log(e.keyCode);
    const key = e.charCode || e.keyCode || 0;
    // Разрешаем backspace, tab, delete, стрелки, обычные цифры и цифры на дополнительной клавиатуре
    return (
      key === 8 ||
      key === 9 ||
      (key >= 37 && key <= 40) ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105));
  }

  make() {
    if (this.value1 === '' || this.value3 === '') {
      this.err = 1;
    } else {
      if (this.card !== undefined) {
        this.usersService.getOneCard(localStorage.getItem('ip'), this.selectedValue).subscribe(
          data => {
            this.card = data[0].num;
            if (this.card < this.value3) {
              this.err = 3;
            } else {
              this.usersService.postMobile(this.value1, this.cards[(this.cards.findIndex(it => it.num === this.selectedValue))].id, this.value3).subscribe();
              this.err = 2;
              setTimeout(() => this.router.navigate(['home']), 1500);
            }
          });
      }
    }
  }
}
