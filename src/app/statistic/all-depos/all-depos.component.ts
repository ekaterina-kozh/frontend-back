import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-all-depos',
  templateUrl: './all-depos.component.html',
  styleUrls: ['./all-depos.component.css']
})
export class AllDeposComponent implements OnInit {

  sum = 0;
  colors = ['#ce4b99', '#b1c94e', '#377bbc', '#DEB887', '#00FA9A', '#8B008B', '#FFDAB9', '#FF0000'];

  constructor(public router: Router, private usersService: UsersService) {
  }

  ngOnInit(): void {
    let cards: any = [];
    this.usersService.getCard(localStorage.getItem('ip')).subscribe(
      data => {
        cards = data;
        const data1 = [];

        data1.push(['Effort', 'Amount given']);
        for (let i = 0; i < cards.length; i++) {
          this.sum += cards[i].sum;
          data1.push(['**** ' + cards[i].num.substr(-4), cards[i].sum]);
        }

        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          const data = google.visualization.arrayToDataTable(data1);

          const options = {
            pieHole: 0.3,
            pieSliceTextStyle: {
              color: 'white',
            },
            chartArea: {width: '100%', height: '80%'},
            fill: 'none'
          };

          const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
          chart.draw(data, options);
        }
      }
    );


  }

  back() {
    this.router.navigate(['home']);
  }

}
