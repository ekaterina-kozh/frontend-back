import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Output() get_action = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  curs(str) {
    this.get_action.emit(str);
  }
}
