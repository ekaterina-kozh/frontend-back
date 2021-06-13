import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  @Input() buy;
  chos = 1;
  index = -1;

  constructor() { }

  ngOnInit(): void {
  }

  change(item: any, index) {
    if (item !== '') {
      this.chos = item / this.buy[index].sum;
      this.index = index * this.buy[index].sum;
    }
  }
}
