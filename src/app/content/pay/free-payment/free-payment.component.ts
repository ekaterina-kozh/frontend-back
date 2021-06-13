import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-free-payment',
  templateUrl: './free-payment.component.html',
  styleUrls: ['./free-payment.component.css']
})
export class FreePaymentComponent implements OnInit {

  cards: any = [];
  value3 = '';
  card = '';

  err = 0;
  selectedValue: string;
  pk = '';
  ynp = '';
  pol = '';
  code = '';
  bank = '';
  ap = '';

  constructor(private usersService: UsersService, public router: Router) {
  }

  ngOnInit(): void {
    this.usersService.getCards(localStorage.getItem('ip')).subscribe(
      data => {
        this.cards = data;
        this.selectedValue = this.cards[0].num;
      });
  }

  make() {
    if (this.pk === '' || this.ynp === '' || this.pol === '' || this.code === '' || this.bank === '' || this.ap === '' || this.value3 === '') {
      this.err = 1;
    } else {
      if (this.card !== undefined) {
        this.usersService.getOneCard(localStorage.getItem('ip'), this.selectedValue).subscribe(
          data => {
            this.card = data[0].num;
            if (this.card < this.value3) {
              this.err = 3;
            } else {
              this.usersService.postFree(this.pk, this.ynp, this.pol, this.code, this.bank, this.ap,
                this.cards[(this.cards.findIndex(it => it.num === this.selectedValue))].id, this.value3).subscribe();
              this.err = 2;
              setTimeout(() => this.router.navigate(['home']), 1500);
            }
          });
      }
    }
  }

  back() {
    this.router.navigate(['home']);
  }

  _keyUp(e: any) {
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

}
