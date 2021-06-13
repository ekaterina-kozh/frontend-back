import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  all: any = [];
  cards: any = [];

  sum  = 0;

  constructor(public router: Router, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getCards(localStorage.getItem('ip')).subscribe(
      data => {
        this.cards = data;
        this.usersService.getProcentCard(this.cards[0].id).subscribe(
          data1 => {
            let data2 = [];
            this.all = data1;
            document.getElementById('card1').setAttribute('class', 'icon-area active-area');
            //console.log(this.all);
            data2.push(['Effort', 'Amount given']);
            for (let i = 0; i < this.all.length; i++) {
              this.sum += this.all[i].procent;
              data2.push([this.all[i].name, this.all[i].procent]);
            }
            google.charts.load('current', {packages: ['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
              const data = google.visualization.arrayToDataTable(data2);

              const options = {
                pieHole: 0.3,
                pieSliceTextStyle: {
                  color: 'white',
                },
                chartArea: {width: '100%', height: '80%'},
                fill: 'none'
              };

              const chart = new google.visualization.PieChart(document.getElementById('char1'));
              chart.draw(data, options);
            }
          }
        );
      });

  }

  back() {
    this.router.navigate(['home']);
  }

  send(id, id2) {
    this.sum = 0;
    const arr = document.querySelectorAll('#cards > p');
    for (let i = 0; i < arr.length; i++) {
      arr[i].setAttribute('class', 'icon-area');
    }
    document.getElementById(id).setAttribute('class', 'icon-area active-area');
    this.usersService.getProcentCard(id2).subscribe(
      data1 => {
        let data2 = [];
        this.all = data1;

        data2.push(['Effort', 'Amount given']);
        for (let i = 0; i < this.all.length; i++) {
          this.sum += this.all[i].procent;
          data2.push([this.all[i].name, this.all[i].procent]);
        }
        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          const data = google.visualization.arrayToDataTable(data2);

          const options = {
            pieHole: 0.3,
            pieSliceTextStyle: {
              color: 'white',
            },
            chartArea: {width: '100%', height: '80%'},
            fill: 'none'
          };

          const chart = new google.visualization.PieChart(document.getElementById('char1'));
          chart.draw(data, options);
        }
      }
    );
  }
}
