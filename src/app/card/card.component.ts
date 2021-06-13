import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../_modal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  id = '';
  type = '';
  sum = '';
  num = '';
  period = '';
  photo = '';
  active = '';

  status = false;

  constructor(public router: Router, public router1: ActivatedRoute, private usersService: UsersService, public modalServ: ModalService) {
  }

  ngOnInit(): void {
    this.id = this.router1.snapshot.params.id;

    this.usersService.getOneIdCard(this.router1.snapshot.params.id).subscribe(data => {
      this.type = data[0].type;
      this.sum = data[0].sum;
      this.num = data[0].num;
      this.period = data[0].period;
      this.photo = data[0].photo;
      this.active = data[0].status;
    });
  }

  back() {
    this.router.navigate(['home']);
  }

  stat() {
    this.router.navigate(['state', this.id]);
  }

  popol() {
    if (this.active === 'active') {
      this.router.navigate(['tranfer', this.num]);
    }
    else {
      this.openModal('card-alert');
    }
  }

  blockCard() {
    this.openModal('card-alert');
  }

  openModal(id: string) {
    this.modalServ.open(id);
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  trueAnswer() {
    this.active = 'block';
    this.usersService.blockCard(this.id).subscribe();
    this.status = true;
    this.closeModal('card-alert');
  }
}
