import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CrossOrigin} from '@angular-devkit/build-angular';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getUserKey(Id: string): Observable<any> {
    return this.http.get(this.baseurl + '/json/getkey/' + Id);
  }

  // tslint:disable-next-line:typedef
  getIPAddress(): Observable<any> {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  postIp(Ip): Observable<any> {
    return this.http.get(this.baseurl + '/json/get/user/' + Ip);
  }

  postId(Login, Password): Observable<any> {
    return this.http.get(this.baseurl + '/json/get/user/data/' + Login + '/' + Password);
  }

  postData(Ip, Id) {
    const body = {ip: Ip, id_user: Id};
    return this.http.post(this.baseurl + '/json/post/user', body);
  }

  getSetting(Ip): Observable<any> {
    return this.http.get(this.baseurl + '/json/get/user/setting/' + Ip);
  }

  postSetting(Pin, Graf, Ip) {
    const body = {pin: Pin, graf: Graf, ip: Ip};
    return this.http.post(this.baseurl + '/json/get/user/setting/', body);
  }

  postSettingOther(Language, Theme, Ip) {
    const body = {language: Language, theme: Theme, ip: Ip};
    return this.http.post(this.baseurl + '/json/get/user/setting/other/', body);
  }

  getPhotoNik(Ip) {
    return this.http.get(this.baseurl + '/json/get/user/photo_nik/' + Ip);
  }

  postPhotoNik(Nik, Photo, Ip) {
    const body = {nik: Nik, photo: Photo, ip: Ip};
    return this.http.post(this.baseurl + '/json/get/user/photo_nik/', body);
  }

  getUsersData(Ip) {
    return this.http.get(this.baseurl + '/json/get/user/data/' + Ip);
  }

  getDocuments(Ip) {
    return this.http.get(this.baseurl + '/json/get/user/documents/' + Ip);
  }

  getPhones(Ip) {
    return this.http.get(this.baseurl + '/json/get/user/phones/' + Ip);
  }

  getEmails(Ip) {
    return this.http.get(this.baseurl + '/json/get/user/emails/' + Ip);
  }

  postDeleteEmail(Id) {
    const body = {id: Id};
    return this.http.post(this.baseurl + '/json/get/emails/delete/', body);
  }

  postDeletePhones(Id) {
    const body = {id: Id};
    return this.http.post(this.baseurl + '/json/get/phones/delete/', body);
  }

  postEditEmail(Email, Id) {
    const body = {email: Email, id: Id};
    return this.http.post(this.baseurl + '/json/get/emails/edit/', body);
  }

  postEditPhones(Phone, Id) {
    const body = {phone: Phone, id: Id};
    return this.http.post(this.baseurl + '/json/get/phones/edit/', body);
  }

  postAddEmail(Ip, Email) {
    const body = {ip: Ip, email: Email};
    return this.http.post(this.baseurl + '/json/get/emails/add/', body);
  }

  postAddPhones(Ip, Phone) {
    const body = {ip: Ip, phone: Phone};
    return this.http.post(this.baseurl + '/json/get/phones/add/', body);
  }

  getSdata(Ip) {
    return this.http.get(this.baseurl + '/json/user/sdata/' + Ip);
  }

  postSdata(Login, Password, Ip) {
    const body = {login: Login, password: Password, ip: Ip};
    return this.http.post(this.baseurl + '/json/get/sdata/edit/', body);
  }

  postExit(Ip) {
    const body = {ip: Ip};
    return this.http.post(this.baseurl + '/json/exit/', body);
  }

  getCurs() {
    return this.http.get(this.baseurl + '/json/curs');
  }

  getOffice(Sity) {
    return this.http.get(this.baseurl + '/json/offices/' + Sity);
  }

  getAtm(Sity) {
    return this.http.get(this.baseurl + '/json/atm/' + Sity);
  }

  getTransactions(Ip, Num, Type) {
    return this.http.get(this.baseurl + '/json/alltr/' + Ip + '/' + Num + '/' + Type);
  }

  getCards(Ip) {
    return this.http.get(this.baseurl + '/json/allcard/' + Ip);
  }

  getTypes() {
    return this.http.get(this.baseurl + '/json/alltypes');
  }

  getOneCard(Ip, Num) {
    return this.http.get(this.baseurl + '/json/card/one/' + Ip + '/' + Num);
  }

  postTranfer(Num, Pol, Sum) {
    const body = {num: Num, pol: Pol, sum: Sum};
    return this.http.post(this.baseurl + '/json/transfer', body);
  }

  postFree(Ls, Unp, Pol, Code, Bank, Naz, Num, Sum) {
    const body = {ls: Ls, unp: Unp, pol: Pol, code: Code, bank: Bank, naz: Naz, num: Num, sum: Sum};
    return this.http.post(this.baseurl + '/json/free', body);
  }

  postErip(Ps, Adr, Typep, Num, Sum) {
    const body = {ps: Ps, adr: Adr, typep: Typep, num: Num, sum: Sum};
    return this.http.post(this.baseurl + '/json/erip', body);
  }

  postMobile(Pol, Num, Sum) {
    const body = {pol: Pol, num: Num, sum: Sum};
    return this.http.post(this.baseurl + '/json/mobile', body);
  }

  getEripTypes() {
    return this.http.get(this.baseurl + '/json/type/erip');
  }

  getHistiry() {
    return this.http.get(this.baseurl + '/json/history');
  }

  getCard(Ip) {
    return this.http.get(this.baseurl + '/json/one/' + Ip);
  }

  getOneIdCard(Id) {
    return this.http.get(this.baseurl + '/json/one/id/' + Id);
  }

  getData(){
    return this.http.get(this.baseurl + '/json/date');
  }

  getReportYear(ID){
    return this.http.get(this.baseurl + '/json/report1/data/year/' + ID);
  }

  getReportMonth(ID){
    return this.http.get(this.baseurl + '/json/report1/data/month/' + ID);
  }

  getReportQuarter(ID){
    return this.http.get(this.baseurl + '/json/report1/data/quarter/' + ID);
  }

  getReport(ID, IP){
    return this.http.get(this.baseurl + '/json/report/data/' + ID + '/' + IP);
  }

  getReportTime(ID, TIME){
    return this.http.get(this.baseurl + '/json/report1/data/time/' + ID + '/' + TIME);
  }

  blockCard(ID){
    const body = {id: ID};
    return this.http.post(this.baseurl + '/json/block/card', body);
  }

  getStatusCard(ID){
    return this.http.get(this.baseurl + '/json/card/status/' + ID);
  }

  getProcentCard(ID){
    return this.http.get(this.baseurl + '/json/procent/' + ID);
  }

  getAllNews(){
    return this.http.get(this.baseurl + '/json/news');
  }

  getOneNews(Title){
    return this.http.get(this.baseurl + '/json/news/' + Title);
  }

  postDebiting(Naz, Num, Sum) {
    const body = {naz: Naz, num: Num, sum: Sum};
    return this.http.post(this.baseurl + '/json/debiting', body);
  }

  getNotific(Ip, Type){
    return this.http.get(this.baseurl + '/json/notif/' + Ip + '/' + Type);
  }

  getOtherCurs() {
    return this.http.get(this.baseurl + '/json/curs/bot');
  }

  getOtherTime() {
    return this.http.get(this.baseurl + '/json/timework');
  }

  getOtherDay() {
    return this.http.get(this.baseurl + '/json/data/bot');
  }

  getWeather(Sity) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + Sity + '&appid=7ffa873e9d516f0daab2e03238f48664');
  }
}
