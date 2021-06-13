import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../../_modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-warning-edit',
  templateUrl: './warning-edit.component.html',
  styleUrls: ['./warning-edit.component.css']
})
export class WarningEditComponent implements OnInit {


  @Input() element = '';
  @Input() title;

  @Output() mes = new EventEmitter();

  answer = false;

  constructor(public translate: TranslateService, public modalServ: ModalService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
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
    this.openModal('alert-dialog-edit-email');
    this.closeModal('warning-edit-email');
  }
}
