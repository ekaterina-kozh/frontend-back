import {Component, OnInit} from '@angular/core';
import {ModalService} from '../_modal';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  date: any = {};
  show;
  profile = true;
  index = 0;
  nik;

  st = false;

  setting: any;

  isLoad: string;

  login = '';
  password = '';

  status = 0;
  url;

  constructor(public translate: TranslateService,
              private http: HttpClient,
              private usersService: UsersService,
              public modalServ: ModalService,
              public router: Router) {
    this.translate.setDefaultLang('ru');
    this.translate.use(localStorage.getItem('language') || 'ru');
  }

  ngOnInit(): void {

    this.usersService.getPhotoNik(localStorage.getItem('ip')).subscribe(
      data => {
        this.nik = data[0].nik;
        this.url = data[0].photo;
        this.isLoad = data[0].photo;
      }
    );

    this.show = false;
  }

  openModal(id: string) {
    this.modalServ.open(id);
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

  showInput() {
    this.st = !this.st;
    this.usersService.postPhotoNik(this.nik, this.url, localStorage.getItem('ip')).subscribe(res => {
      console.log('Запись удачно изменена');
    }, error => {
      console.log(error);
    });
  }

  onSelectFile(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
        this.usersService.postPhotoNik(this.nik, this.url, localStorage.getItem('ip')).subscribe(res => {
          console.log('Запись удачно изменена');
        }, error => {
          console.log(error);
        });
        this.isLoad = this.url;
      };
    }
  }

  exit() {
    this.modalServ.open('alert-dialog-exit');
  }

  exitMake() {
    this.modalServ.close('alert-dialog-exit');

    this.usersService.postExit(localStorage.getItem('ip')).subscribe(res => {
      //console.log('Запись удачно изменена');
    }, error => {
      console.log(error);
    });
    this.router.navigate(['auth']);
  }
}
