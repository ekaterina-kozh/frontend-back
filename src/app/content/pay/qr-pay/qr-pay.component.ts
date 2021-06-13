import {AfterViewInit, Component, ViewChild, ViewEncapsulation, OnInit, ElementRef, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {ModalService} from '../../../_modal';
import {QrScannerComponent} from 'angular2-qrscanner';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-qr-pay',
  templateUrl: './qr-pay.component.html',
  styleUrls: ['./qr-pay.component.css'],
  /*encapsulation: ViewEncapsulation.None*/
})
export class QrPayComponent{

  title = 'read-qrcodes-angular7';
  elementType = 'url';
  public imagePath;
  value: any;

  status = 0;

  cards: any = [];
  num = '';

  text = 'Upload an QR code';

  @ViewChild('result') resultElement: ElementRef;
  showQRCode = false;
  constructor(private renderer: Renderer2, public router: Router, public modalServ: ModalService, private usersService: UsersService) {
  }

  ngOnInit() {
    if (localStorage.getItem('language') === 'ru'){
      this.text = 'Загрузите ваш QR код';
    }
    if (localStorage.getItem('language') === 'by'){
      this.text = 'Спампаваць QR-код';
    }
    if (localStorage.getItem('language') === 'en'){
      this.text = 'Upload an QR code';
    }
    this.usersService.getCards(localStorage.getItem('ip')).subscribe(
      data => {
        this.cards = data;
        this.num = this.cards[0].num;
      });
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Only images are supported.');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.value = reader.result;
      // console.log(reader.result);
      this.showQRCode = true;
    };
  }
  render(e) {
    console.log(e.result);
    const result = e.result;
    const str = result.split(' ')[0];
    setTimeout(() => {
      switch (str) {
        case 'transfer':
          if (result.split(' ')[2] !== undefined || result.split(' ')[4] !== undefined || Number.parseFloat(result.split(' ')[4]) !== NaN) {
            this.usersService.postTranfer(this.cards[(this.cards.findIndex(it => it.num === this.num))].id,
              result.split(' ')[2], result.split(' ')[4]).subscribe();
            this.status = 2;
          }
          break;
        case 'erip':
          this.usersService.postErip(result.split(' ')[2], result.split(' ')[4], result.split(' ')[6],
            this.cards[(this.cards.findIndex(it => it.num === this.num))].id, result.split(' ')[8]).subscribe();
          this.status = 2;
          break;
        case 'mobile-pay':
          if (result.split(' ')[2] !== undefined || result.split(' ')[4] !== undefined || Number.parseFloat(result.split(' ')[4]) !== NaN) {
            this.usersService.postMobile(result.split(' ')[2], this.cards[(this.cards.findIndex(it => it.num === this.num))].id, result.split(' ')[4]).subscribe();
            this.status = 2;
          }
          break;
        case 'free-pay':
          this.usersService.postFree(result.split(' ')[2], result.split(' ')[4], result.split(' ')[6], result.split(' ')[8], result.split(' ')[10], result.split(' ')[12],
            this.cards[(this.cards.findIndex(it => it.num === this.num))].id, result.split(' ')[14]).subscribe();
          this.status = 2;
          break;
        case 'shop':
        case 'cafe':
          // tslint:disable-next-line:use-isnan
          if (result.split(' ')[2] !== undefined || result.split(' ')[4] !== undefined || Number.parseFloat(result.split(' ')[4]) !== NaN) {
            this.usersService.postDebiting(result.split(' ')[2], this.num, result.split(' ')[4]).subscribe();
            this.status = 2;
          }
          break;
        default:
          this.status = 1;
          break;
      }
    }, 500);
  }

  qrGenerate(str) {
    this.router.navigate([str]);
  }


}
