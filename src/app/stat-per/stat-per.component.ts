import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-stat-per',
  templateUrl: './stat-per.component.html',
  styleUrls: ['./stat-per.component.css']
})
export class StatPerComponent implements OnInit {

  langArrayEN = {
    accountNumber: 'Account Number',
    accountView: 'Account',
    address: 'Customer address',
    amount: 'Transaction amount',
    amountAccount: 'Posting amount',
    authCode: 'Authorization Code',
    authorizations: 'Authorizations',
    balance: 'Balance available as at the bank statement generation date',
    bankCode: 'Bank code',
    client: 'Client',
    contract: 'Bank payment card',
    contractCurrency: 'Account currency',
    contractNumber: '',
    currency: 'Transaction currency',
    credits: 'Credits',
    date: 'Date',
    debits: 'Debits',
    detalization: 'Transaction',
    fee: 'Fee',
    fullName: 'Customer name',
    from: 'from',
    header0: 'Bank BelVEB OJSC',
    header1: '29, Pobediteley Avenue, 220004',
    header2: 'Minsk, Republic of Belarus',
    header3: 'Tel.: +375 17 215 61 15',
    header4: 'E-mail: office@belveb.by',
    inProcessing: 'pending',
    limits: 'Limits',
    notFound: 'Not found operations',
    openDate: 'Account open date',
    operationDate: 'Transaction date',
    operations: 'Operations',
    period: 'Bank statement generation period',
    postedDate: 'Transaction posting date/transaction status',
    title: 'Information on transactions effected by using your bank payment card or its details',
    to: 'to',
    total: 'Total',
    transactions: 'Transactions',
    reportDate: 'Bank statement generation date',
    rrn: 'RRN',
    sic: 'MCC',
    BYN: 'BYN',
    USD: 'USD',
    EUR: 'EUR'
  };
  const;
  langArrayRU = {
    accountNumber: 'Номер счёта',
    accountView: 'Отражение по счёту',
    address: 'Адрес клиента',
    amount: 'Сумма операции',
    amountAccount: 'Сумма операции, отражённая по счёту',
    authCode: 'Код авторизации',
    authorizations: 'Авторизации по карте',
    balance: 'Доступный остаток средств по  карточке на момент формирования',
    bankCode: 'Код Банка ',
    client: 'Клиент',
    contract: 'Банковская платежная карточка',
    contractCurrency: 'Валюта счёта',
    contractNumber: '',
    currency: 'Валюта операции',
    credits: 'Списаний',
    date: 'Дата',
    debits: 'Пополнений',
    detalization: 'Наименование операции',
    fee: 'Комиссия',
    fullName: 'Ф.И.О. клиента',
    from: 'с',
    header0: 'ОАО «Банк БелВЭБ»',
    header1: '220004, Республика Беларусь,',
    header2: 'г.Минск, пр-т Победителей, 29',
    header3: 'Тел.: +375 17 215 61 15',
    header4: 'E-mail: office@belveb.by',
    inProcessing: 'ожидает обработки',
    limits: 'Кредитный лимит/лимит овердрафта',
    notFound: 'Операции не найдены',
    openDate: 'Дата открытия счёта',
    operationDate: 'Дата совершения операции',
    operations: 'Операции по счёту',
    period: 'Период формирования',
    postedDate: 'Дата отражения операции по счёту/статус операции',
    title: 'Информация об операциях с использованием карточки либо её реквизитов',
    to: 'по',
    total: 'Итого',
    transactions: 'Транзакции',
    reportDate: 'Дата формирования',
    rrn: 'RRN',
    sic: 'МСС-код точки обслуживания',
    BYN: 'Белорусский рубль',
    USD: 'Доллар США',
    EUR: 'Евро',
  };

  data;
  mount = '';
  quarter = '';
  year = '';

  type = '';
  choosedata = '';

  status = false;

  langArray: any;
  id = '';

  alldata: any = [];

  constructor(public router: Router, public router1: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.id = this.router1.snapshot.params.id;
    this.langArray = this.langArrayRU;
    this.usersService.getData().subscribe(
      data => {
        this.data = data[0].date.substring(0, 10);
        this.choosedata = data[0].mount.substring(0, 10);
        this.mount = data[0].mount.substring(0, 10);
        this.quarter = data[0].quarter.substring(0, 10);
        this.year = data[0].year.substring(0, 10);
      }
    );
  }

  back() {
    this.router.navigate(['home']);
  }

  changeType(str: string) {
    document.getElementById('year').setAttribute('class', 'icon-area');
    document.getElementById('quater').setAttribute('class', 'icon-area');
    document.getElementById('mount').setAttribute('class', 'icon-area');
    document.getElementById(str).setAttribute('class', 'icon-area active-area');
    this.type = str;
    switch (this.type) {
      case 'mount':
        this.choosedata = this.mount;
        break;
      case 'year':
        this.choosedata = this.year;
        break;
      case 'quater':
        this.choosedata = this.quarter;
        break;
    }
  }

  makeAct() {
    console.log(this.type, this.data, this.choosedata, this.langArray.to);
    this.usersService.getReport(this.id, localStorage.getItem('ip')).subscribe(
      data => {
        this.langArray.contractNumber = data[0].num;
        this.langArray.name = data[0].name;
        this.langArray.sum = data[0].sum;
        this.status = true;
      }
    );
    this.usersService.getReportTime(this.id, this.choosedata).subscribe(
      data => {
        this.alldata = data;
        console.log(this.alldata);
      }
    );
  }

  createPDF() {

  }

  Export2Word(element, filename = '') {
    const preHtml = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:w=\'urn:schemas-microsoft-com:office:word\' xmlns=\'http://www.w3.org/TR/REC-html40\'><head><meta charset=\'utf-8\'><title>Export HTML To Doc</title></head><body>';
    const postHtml = '</body></html>';
    const html = preHtml + document.getElementById(element).innerHTML + postHtml;

    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    // Specify link url
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    const downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  chooseLang(str: string) {
    document.getElementById('ru').setAttribute('class', 'icon-area');
    document.getElementById('en').setAttribute('class', 'icon-area');
    if (str === 'ru'){
      document.getElementById('ru').setAttribute('class', 'icon-area active-area');
      this.langArray = this.langArrayRU;
    } else {
      document.getElementById('en').setAttribute('class', 'icon-area active-area');
      this.langArray = this.langArrayEN;
    }
  }
}
