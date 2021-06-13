import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tranfer',
  templateUrl: './tranfer.component.html',
  styleUrls: ['./tranfer.component.css']
})
export class TranferComponent implements OnInit {

  cards: any = [];
  value1 = '';
  value2 = '';
  value3 = '';
  card = '';

  err = 0;
  selectedValue: string;
  id;

  constructor(private usersService: UsersService, public router: Router, public router1: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.router1.snapshot.params.id;
      this.usersService.getCards(localStorage.getItem('ip')).subscribe(
        data => {
          this.cards = data;
          if (this.id === '0') {
            this.selectedValue = this.cards[0].num;
          } else {
            this.selectedValue = this.id;
          }
        });
  }

  make() {
    if (this.value2 === '' || this.value3 === '') {
      this.err = 1;
    } else {
      if (this.card !== undefined) {
        this.usersService.getOneCard(localStorage.getItem('ip'), this.selectedValue).subscribe(
          data => {
            this.card = data[0].num;
            if (this.card < this.value3) {
              this.err = 3;
            } else {
              this.usersService.postTranfer(this.cards[(this.cards.findIndex(it => it.num === this.selectedValue))].id, this.value2, this.value3).subscribe();
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

  listen() {
    if (this.value2.length === 4 || this.value2.length === 9 || this.value2.length === 14) {
      this.value2 += ' ';
    }
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
