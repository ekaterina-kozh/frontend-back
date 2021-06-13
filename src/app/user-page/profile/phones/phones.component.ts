import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import date from '../../../../../date.json';
import {ModalService} from '../../../_modal';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {

  @Output() get_phones = new EventEmitter();


  phones: any;
  index = 0;
  phone = '';
  title = '';
  element = 'телефон';


  message = '';
  get_answer = false;
  item;

  el;
  id;

  constructor(public modalServ: ModalService, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getPhones(localStorage.getItem('ip')).subscribe(
      data => {
        this.phones = data;
      }
    );
    this.get_phones.emit(this.phones);
  }

  openModal(id: string, phone) {
    this.modalServ.open(id);
    this.phone = phone;
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  deletePhone(item: any) {
    this.openModal('warning-delete-phones', '');
    this.closeModal('custom-modal-2');
    this.item = item;
  }

  AddPhone(str: any) {
    this.usersService.getPhones(localStorage.getItem('ip')).subscribe(
      data => {
        this.phones = data;
      }
    );
  }

  EditPhone(str: any) {
    this.usersService.getPhones(localStorage.getItem('ip')).subscribe(
      data => {
        this.phones = data;
      }
    );
  }


  answer(str: any) {
    /*delete element*/
    this.get_answer = str;
    if (this.get_answer) {
      this.index = this.phones.indexOf(this.item);
      this.phones.splice(this.index, 1);

      this.usersService.postDeletePhones(this.item.id).subscribe(res => {
        console.log('Запись успешно удалена');
      }, error => {
        console.log(error);
      });

      this.index = 0;
      this.message = 'Телефон успешно удален';
      this.get_phones.emit(this.phones[0].phone);
      this.openModal('alert-dialog-delete-phone', this.message);
      this.closeModal('warning-delete-phones');
    }
  }

  clikElem(item: any) {
    this.openModal('edit-phone', item);
    this.closeModal('custom-modal-2');
    this.id = item.id;
    this.phone = item.phone;
    this.el = item;
  }

}
