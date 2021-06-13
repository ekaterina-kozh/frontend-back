import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import {Router} from '@angular/router';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css']
})
export class GenerateQrComponent implements OnInit {

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';

  value2 = '';
  value3 = '';

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['qr']);
  }

  // tslint:disable-next-line:typedef
  listen() {
    if (this.value2.length === 4 || this.value2.length === 9 || this.value2.length === 14) {
      this.value2 += ' ';
    }
  }

  // tslint:disable-next-line:typedef
  _keyUp(e: any) {
    const key = e.charCode || e.keyCode || 0;
    // Разрешаем backspace, tab, delete, стрелки, обычные цифры и цифры на дополнительной клавиатуре
    return (
      key === 8 ||
      key === 9 ||
      key === 46 ||
      key === 190 ||
      (key >= 37 && key <= 40) ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105));
  }

  // tslint:disable-next-line:typedef
  generateQR() {

    html2canvas(document.getElementById('qr-code-generate')).then((carvas) => {
      //console.log(carvas);
      const getValue = carvas.toDataURL();
      //console.log(getValue);
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('download', 'qr-code.png');
      const url = getValue.replace(/^data:image\/png/, 'data:application/octet-stream');
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });

  }

}
