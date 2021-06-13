import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../../_modal';

@Component({
  selector: 'app-warning-delete-phone',
  templateUrl: './warning-delete.component.html',
  styleUrls: ['./warning-delete.component.css']
})
export class WarningDeletePhoneComponent implements OnInit {

  @Input() title;
  @Input() element;
  @Output() mes = new EventEmitter();

  answer = false;

  constructor(public modalServ: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  delete_phone() {
    this.answer = true;
    this.mes.emit(this.answer);
    this.closeModal('warning-delete-phones');
  }

}
