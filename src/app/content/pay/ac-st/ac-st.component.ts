import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ac-st',
  templateUrl: './ac-st.component.html',
  styleUrls: ['./ac-st.component.css']
})
export class AcStComponent implements OnInit {

  value1 = 'none';
  value2 = 'none';
  table_data: any;

  cards: any;
  cards2: any = [];
  types: any;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getTransactions(localStorage.getItem('ip'), this.value1, this.value2).subscribe(
      data => {
        this.table_data = data[0];

        for (let i = 0; i < this.table_data.length; i++) {
          this.table_data[i].num_card = '**** ' + this.table_data[i].num_card.slice(-4);
        }

      });

    this.usersService.getCards(localStorage.getItem('ip')).subscribe(
      data => {
        this.cards = data;
        for (let i = 0; i < this.cards.length; i++) {
          this.cards[i].num = '**** ' + this.cards[i].num.slice(-4);
        }
      });

    this.usersService.getCards(localStorage.getItem('ip')).subscribe(
      data => {
        this.cards2 = data;
      });

    this.usersService.getTypes().subscribe(
      data => {
        this.types = data;

      });

  }

  changeType(name) {
    if (name.target.selectedIndex === (this.types.length + 1)) {
      this.value2 = 'none';
    } else {
      this.value2 = this.types[name.target.selectedIndex - 1].name;
    }
    this.usersService.getTransactions(localStorage.getItem('ip'), this.value1, this.value2).subscribe(
      data => {
        this.table_data = data[0];

        for (let i = 0; i < this.table_data.length; i++) {
          this.table_data[i].num_card = '**** ' + this.table_data[i].num_card.slice(-4);
        }
      });
  }

  changeCard(name) {
    if (name.target.selectedIndex === (this.cards2.length + 1)) {
      this.value1 = 'none';
    } else {
      this.value1 = this.cards2[name.target.selectedIndex - 1].num;
    }
    this.usersService.getTransactions(localStorage.getItem('ip'), this.value1, this.value2).subscribe(
      data => {
        this.table_data = data[0];

        for (let i = 0; i < this.table_data.length; i++) {
          this.table_data[i].num_card = '**** ' + this.table_data[i].num_card.slice(-4);
        }
      });
  }

  // tslint:disable-next-line:variable-name
  exportAsPDF(div_id) {
    const data = document.getElementById(div_id);
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('transaction.pdf'); // Generated PDF
    });

  }
}
