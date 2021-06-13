import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../../_modal';

@Component({
  selector: 'app-warning-edit-phone',
  templateUrl: './warning-edit.component.html',
  styleUrls: ['./warning-edit.component.css']
})
export class WarningEditPhoneComponent implements OnInit {


  @Input() element_phone = '';
  @Input() title;

  @Output() mes = new EventEmitter();

  answer = false;

  constructor(public modalServ: ModalService) {
  }

  ngOnInit(): void {

  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  openModal(id: string) {
    this.modalServ.open(id);
  }


  edit() {
    this.answer = true;
    this.mes.emit(this.answer);
    //this.openModal('alert-dialog-edit-phone');
    this.closeModal('warning-edit-phones');
  }
}
