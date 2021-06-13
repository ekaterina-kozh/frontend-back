import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-curs',
  templateUrl: './curs.component.html',
  styleUrls: ['./curs.component.css']
})
export class CursComponent implements OnInit {

  st = true;

  buy_v: any;
  sell_v: any;

  tr1: any;
  tr2: any;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {

      this.usersService.getCurs().subscribe(
        data => {
          this.buy_v = data[0].buy;
        });
      this.usersService.getCurs().subscribe(
        data => {
          this.sell_v = data[0].sell;
          //console.log(data);
        });

  }

}
