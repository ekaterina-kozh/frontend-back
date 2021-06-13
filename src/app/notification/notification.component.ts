import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public router: Router, private usersService: UsersService) {
  }

  types: any = [];
  value2 = '1';

  notif: any = [];


  ngOnInit(): void {
    this.usersService.getTypes().subscribe(
      data => this.types = data
    );

    this.usersService.getNotific(localStorage.getItem('ip'), this.value2).subscribe(
      data => {
        this.notif = data[0];
      }
    );
  }

  changeType(name) {
    if (name.target.selectedIndex === (this.types.length + 1)) {
      this.value2 = 'none';
    } else {
      this.value2 = this.types[name.target.selectedIndex - 1].name;
    }
    this.usersService.getNotific(localStorage.getItem('ip'), name.target.selectedIndex).subscribe(
      data => {
        this.notif = data[0];
      }
    );
  }

  back() {
    this.router.navigate(['home']);
  }

}
