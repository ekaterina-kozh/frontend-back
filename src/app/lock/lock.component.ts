import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {

  result;
  change = false;

  key1;
  key2;

  answer = '';

  constructor(public router: Router,
              private usersService: UsersService) {
  }

  ngOnInit(): void {

    this.usersService.getSetting(localStorage.getItem('ip')).subscribe(
      data => {
        //localStorage.setItem('setting', data[0].setting);
        if (data[0].graf == null){
          this.key1 = 0;
        } else {
          this.key1 = data[0].graf.length;
        }
        if (data[0].pin == null){
          this.key2 = 0;
        } else {
          this.key2 = data[0].pin.length;
        }
      });

  }
}
