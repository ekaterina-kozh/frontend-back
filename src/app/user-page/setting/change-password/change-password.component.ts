import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../_modal';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() pass;
  @Input() log;
  password = '';
  password2 = '';

  message = '';

  value = false; //type pass
  value2 = false;
  value3 = false;

  st = 0;
  password3 = '';

  constructor(public modalServ: ModalService, private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  savePassword() {
    //console.log(this.password3, localStorage.getItem('password'));
    if (this.pass !== this.password3){
      this.st = 2;
    } else {
      if (this.password != this.password2) {
        this.st = 1;
      } else {
        this.usersService.postSdata(this.log, this.password, localStorage.getItem('ip')).subscribe(res => {
          //console.log('Запись удачно изменена');
        }, error => {
          console.log(error);
        });
        this.openModal('alert-dialog-success');
        this.closeModal('change-password');
      }
    }
  }

  changeType() {
    this.value = !this.value;
    if (this.value) {
      document.getElementById('pass1').setAttribute('type', 'text');
    } else {
      document.getElementById('pass1').setAttribute('type', 'password');
    }
  }

  changeType2() {
    this.value2 = !this.value2;
    if (this.value2) {
      document.getElementById('pass2').setAttribute('type', 'text');
    } else {
      document.getElementById('pass2').setAttribute('type', 'password');
    }
  }

  openModal(id: string) {
    this.modalServ.open(id);
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  changeType3() {
    this.value3 = !this.value3;
    if (this.value3) {
      document.getElementById('pass3').setAttribute('type', 'text');
    } else {
      document.getElementById('pass3').setAttribute('type', 'password');
    }
  }
}
