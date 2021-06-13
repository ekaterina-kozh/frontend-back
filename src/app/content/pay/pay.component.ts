import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  st = 1;
  history: any = [];

  constructor(public router: Router, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getHistiry().subscribe(
      data => this.history = data);
  }


  answer(str) {
    this.router.navigate([str]);

  }

  navigate(name) {
    let str = name.substring(0, name.indexOf(' '));
    switch (str) {
      case 'Перевод':
        this.router.navigate(['tranfer/0']);
        break;
      case 'ЕРИП':
        this.router.navigate(['erip']);
        break;
      case 'Свободный':
        this.router.navigate(['free-payment']);
        break;
      case 'Мобильный':
        this.router.navigate(['mobile-payment']);
        break;
    }
  }
}
