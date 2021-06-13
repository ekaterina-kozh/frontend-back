import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import translate from 'translate';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  cards: any = [];

  st = 0;

  news: any = [];

  constructor(private usersService: UsersService, public router: Router) {
  }

  ngOnInit(): void {
    this.usersService.getCard(localStorage.getItem('ip')).subscribe(
      data => this.cards = data
    );

    this.usersService.getAllNews().subscribe(
      data => this.news = data
    );
  }

  send(item: any) {
    this.router.navigate(['card', item]);
  }

  navigate(str: string, str2: string) {
    if (str2 === '') {
      this.router.navigate([str]);
    } else {
      this.router.navigate([str, str2]);
    }
  }
}
