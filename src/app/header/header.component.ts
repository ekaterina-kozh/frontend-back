import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  types: any = [];
  value = '';

  constructor(public router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getEripTypes().subscribe(
      data => {
        this.types = data;
      });
  }

  answer(str) {
    this.router.navigate([str]);
  }

  listen(e) {
    if (e.keyCode === 13){
      switch (this.value){
        case 'Перевод средств':
          this.router.navigate(['tranfer/0']);
          break;
        case 'ЕРИП':
          this.router.navigate(['erip']);
          break;
        case 'Свободный платеж':
          this.router.navigate(['free-payment']);
          break;
        case 'Мобильный платеж':
          this.router.navigate(['mobile-payment']);
          break;
        default:
          this.router.navigate(['erip']);
          break;
      }
    }
  }
}
