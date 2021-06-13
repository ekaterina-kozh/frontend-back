import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-list-map',
  templateUrl: './list-map.component.html',
  styleUrls: ['./list-map.component.css']
})
export class ListMapComponent implements OnInit {
  offices: any = [];
  atm: any = [];

  st = true;

  sities = [];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {

    this.usersService.getOffice('г. Минск').subscribe(
      data => {
        this.offices = data[0];
        this.sities = this.offices.sities;
      });
  }

  changeType(name) {
    if (name.target.selectedIndex === 0) {
      this.usersService.getOffice('г. Минск').subscribe(
        data => {
          this.offices = data[0];
          this.sities = this.offices.sities;
        });
      this.st = true;
      this.sities = this.offices.sities;
    } else if (name.target.selectedIndex === 1) {
      this.usersService.getAtm('Минск').subscribe(
        data => {
          this.atm = data[0];
          this.sities = this.atm.sities;
        });

      this.st = false;
      this.sities = this.atm.sities;
    }
  }

  changeSity(name) {
    if (this.st === true) {
      this.usersService.getOffice(this.sities[name.target.selectedIndex]).subscribe(
        data => {
          this.offices = data[0];
        });
    } else {
      this.usersService.getAtm(this.sities[name.target.selectedIndex]).subscribe(
        data => {
          this.atm = data[0];
        });
    }
  }
}
