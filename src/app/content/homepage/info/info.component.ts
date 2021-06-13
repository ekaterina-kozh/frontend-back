import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoNewsComponent implements OnInit {

  title = '';
  news: any = [];

  constructor(public router: Router, public router1: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.title = this.router1.snapshot.params.title;
    this.usersService.getOneNews(this.title).subscribe(
      data => {
        this.news = data;
        this.news.content = this.news.content.substring((this.news.content.indexOf('\n') + 1),
          this.news.content.lastIndexOf('\n') - 8);
      }
    );
  }

  trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  back() {
    this.router.navigate(['home']);
  }

}
