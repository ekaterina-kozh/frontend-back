import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../../_modal';
import {UsersService} from '../../../../services/users.service';

@Component({
  selector: 'app-phone-add',
  templateUrl: './phone-add.component.html',
  styleUrls: ['./phone-add.component.css']
})
export class PhoneAddComponent implements OnInit {

  @Output() mes = new EventEmitter();
  phones = [];
  phone = '';
  message = '';
  st = 0;
  arr: any;

  constructor(public modalServ: ModalService, private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  savePhone() {

    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.arr = data;
        for (let i = 0; i < this.arr.length; i++) {
          this.phones.push(this.arr[i].phone);
        }
        if (this.phones.includes(this.phone)) {
          this.st = 2;
          this.message = 'Данный телефон уже существует';
          this.openModal('alert-dialog-add-phone', this.message);
          this.closeModal('add-phone');
        } else {

          this.usersService.postAddPhones(localStorage.getItem('ip'), this.phone).subscribe(res => {
            console.log('Запись удачно изменена');
          }, error => {
            console.log(error);
          });

          this.st = 1;
          this.message = 'Телефон успешно сохранён';
          this.openModal('alert-dialog-add-phone', this.message);
          this.closeModal('add-phone');

          this.phone = '';
          this.mes.emit(this.phone);
          this.closeModal('add-phone');
        }
        this.phones = [];
      });
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  openModal(id: string, mes) {
    this.modalServ.open(id);
    this.message = mes;
  }

}
