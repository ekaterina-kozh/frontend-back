import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../../_modal';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-warning-delete',
  templateUrl: './warning-delete.component.html',
  styleUrls: ['./warning-delete.component.css']
})
export class WarningDeleteComponent implements OnInit {

  @Input() title;
  @Input() element;
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

  delete() {
    this.answer = true;
    this.mes.emit(this.answer);
    this.closeModal('warning-delete-email');
  }

}
