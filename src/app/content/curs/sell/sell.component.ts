import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  @Input() sell;
  chos = 1;
  index = -1;

  //arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() { }

  ngOnInit(): void {
  }

  change(item: any, index) {
    if (item !== '') {
      this.chos = item / this.sell[index].sum;
      this.index = index * this.sell[index].sum;
    }
  }

}
