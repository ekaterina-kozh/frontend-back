import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../_modal';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-pk',
  templateUrl: './pk.component.html',
  styleUrls: ['./pk.component.css']
})
export class PkComponent implements OnInit {
  st;

  @Input() ch1 = false;
  @Input() ch2 = false;

  @Input() pin_l = 0;
  @Input() graf_l = 0;

  constructor(public translate: TranslateService,
              public modalServ: ModalService,
              public router: Router,
              public usersService: UsersService) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {

  }

  openModal(id: string) {
    this.modalServ.open(id);
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  onChange(str) {
    if (str === 'graf' && this.ch1) {
      setTimeout(() => {
        this.closeModal('pk');
        if (this.graf_l !== 0) {
          this.st = 'change';
          this.router.navigate(['lock/graf', this.st]);
        } else if (this.graf_l === 0) {
          this.st = 'new';
          this.router.navigate(['lock/graf', this.st]);
        }
      }, 500);
    }
    if (str === 'pin' && this.ch2) {
      setTimeout(() => {
        this.closeModal('pk');
        if (this.pin_l !== 0) {
          this.st = 'change';
          this.router.navigate(['lock/pin', this.st]);
        } else if (this.pin_l === 0) {
          this.st = 'new';
          this.router.navigate(['lock/pin', this.st]);
        }
      }, 500);
    }
  }
}
