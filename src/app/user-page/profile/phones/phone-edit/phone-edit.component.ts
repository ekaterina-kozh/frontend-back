import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../../_modal';
import {UsersService} from '../../../../services/users.service';

@Component({
  selector: 'app-phone-edit',
  templateUrl: './phone-edit.component.html',
  styleUrls: ['./phone-edit.component.css']
})
export class PhoneEditComponent implements OnInit {

  @Output() mes = new EventEmitter();
  phones = [];

  @Input() phone;
  @Input() index;
  @Input() element2: any;
  st = 0;

  title = 'Изменение элемента';
  element_phone = 'телефон';
  message = 'Изменение телефона успешно';
  arr: any;

  constructor(public modalServ: ModalService, private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  editPhone() {

    this.usersService.getEmails(localStorage.getItem('ip')).subscribe(
      data => {
        this.arr = data;
        for (let i = 0; i < this.arr.length; i++) {
          this.phones.push(this.arr[i].phone);
        }
        if (this.phones.includes(this.phone)) {
          this.st = 2;
          this.message = 'Данный телефон уже существует';
          this.openModal('alert-dialog-edit-phone', this.message);
          this.closeModal('edit-phone');
        } else {
          this.openModal('warning-edit-phones', this.message);
          this.closeModal('edit-phone');
        }
        this.phones = [];
      }
    );
  }

  openModal(id: string, mes) {
    this.modalServ.open(id);
    this.message = mes;
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  answer_phone(str: any) {
    this.st = 1;
    this.message = 'Телефон успешно изменён';
    if (str) {

      this.usersService.postEditPhones(this.phone, this.index).subscribe(res => {
        console.log('Запись удачно изменена');
      }, error => {
        console.log(error);
      });

      this.usersService.getPhones(localStorage.getItem('ip')).subscribe(
        data => {
          this.arr = data;
          for (let i = 0; i < this.arr.length; i++) {
            this.phones.push(this.arr[i].phone);
          }
          if (this.phones.includes(this.phone)) {

            this.mes.emit(this.phone);

            this.st = 1;
            this.message = 'Телефон успешно изменён';
            this.openModal('alert-dialog-edit-phone', this.message);
            this.closeModal('edit-phone');
          }
          this.phones = [];
        });

    }

  }
}
