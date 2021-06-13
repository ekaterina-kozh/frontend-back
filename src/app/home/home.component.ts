import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  action = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  action_get(str: any) {
    this.action = str;
  }
}
