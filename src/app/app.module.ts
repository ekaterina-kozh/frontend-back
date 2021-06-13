import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ContentComponent} from './content/content.component';
import {UserPageComponent} from './user-page/user-page.component';

import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ModalModule} from './_modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './user-page/profile/profile.component';
import { SettingComponent } from './user-page/setting/setting.component';
import { PersDateComponent } from './user-page/profile/pers-date/pers-date.component';
import { PhonesComponent } from './user-page/profile/phones/phones.component';
import { EmailsComponent } from './user-page/profile/emails/emails.component';
import { EmailsAddComponent } from './user-page/profile/emails/emails-add/emails-add.component';
import { EmailsEditComponent } from './user-page/profile/emails/emails-edit/emails-edit.component';
import { WarningDeleteComponent } from './user-page/profile/emails/warning-delete-email/warning-delete.component';
import { WarningEditComponent } from './user-page/profile/emails/warning-edit-email/warning-edit.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { PhoneAddComponent } from './user-page/profile/phones/phone-add/phone-add.component';
import { PhoneEditComponent } from './user-page/profile/phones/phone-edit/phone-edit.component';
import {WarningDeletePhoneComponent} from './user-page/profile/phones/warning-delete-phones/warning-delete.component';
import {WarningEditPhoneComponent} from './user-page/profile/phones/warning-edit-phones/warning-edit.component';
import { ChangeLoginComponent } from './user-page/setting/change-login/change-login.component';
import { ChangePasswordComponent } from './user-page/setting/change-password/change-password.component';
import { PkComponent } from './user-page/setting/pk/pk.component';
import { LangulageComponent } from './user-page/setting/langulage/langulage.component';
import { ThemeComponent } from './user-page/setting/theme/theme.component';
import { InfoComponent } from './user-page/setting/info/info.component';
import { GrafKeyComponent } from './lock/graf-key/graf-key.component';
import { LockComponent } from './lock/lock.component';
import { PinComponent } from './lock/pin/pin.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CursComponent } from './content/curs/curs.component';
import { BotComponent } from './content/bot/bot.component';
import { MapComponent } from './content/map/map.component';
import { PayComponent } from './content/pay/pay.component';
import { HomepageComponent } from './content/homepage/homepage.component';
import { SellComponent } from './content/curs/sell/sell.component';
import { BuyComponent } from './content/curs/buy/buy.component';
import { AcStComponent } from './content/pay/ac-st/ac-st.component';
import { TranferComponent } from './content/pay/tranfer/tranfer.component';
import { EripComponent } from './content/pay/erip/erip.component';
import { FreePaymentComponent } from './content/pay/free-payment/free-payment.component';
import { MobilePaymentComponent } from './content/pay/mobile-payment/mobile-payment.component';
import { MenuMapComponent } from './content/map/menu-map/menu-map.component';
import { ListMapComponent } from './content/map/list-map/list-map.component';
import { CardComponent } from './card/card.component';
import { StatPerComponent } from './stat-per/stat-per.component';
import { StatisticComponent } from './statistic/statistic.component';
import { AllDeposComponent } from './statistic/all-depos/all-depos.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {InfoNewsComponent} from './content/homepage/info/info.component';
import { QrPayComponent } from './content/pay/qr-pay/qr-pay.component';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import { GenerateQrComponent } from './content/pay/qr-pay/generate-qr/generate-qr.component';
import { NotificationComponent } from './notification/notification.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';

const appRoutes: Routes = [
  //{path: '', redirectTo: 'lock/check', pathMatch: 'full'},
  {path: '', component: AppComponent},
  {path: 'user', component: UserPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'lock/:st', component: LockComponent},
  {path: 'lock/pin/:st', component: PinComponent},
  {path: 'lock/graf/:st', component: GrafKeyComponent},
  {path: 'auth', component: MainpageComponent},
  {path: 'erip', component: EripComponent},
  {path: 'tranfer/:id', component: TranferComponent},
  {path: 'free-payment', component: FreePaymentComponent},
  {path: 'mobile-payment', component: MobilePaymentComponent},
  {path: 'card', component: CardComponent},
  {path: 'state/:id', component: StatPerComponent},
  {path: 'statistic', component: StatisticComponent},
  {path: 'all-dep', component: AllDeposComponent},
  {path: 'news/:title', component: InfoNewsComponent},
  {path: 'qr', component: QrPayComponent},
  {path: 'qr-generate', component: GenerateQrComponent},
  {path: 'notif', component: NotificationComponent},

];

// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    UserPageComponent,
    HomeComponent,
    ProfileComponent,
    SettingComponent,
    PersDateComponent,
    PhonesComponent,
    EmailsComponent,
    EmailsAddComponent,
    EmailsEditComponent,
    WarningDeleteComponent,
    WarningEditComponent,
    AlertDialogComponent,
    PhoneAddComponent,
    PhoneEditComponent,
    WarningDeletePhoneComponent,
    WarningEditPhoneComponent,
    ChangeLoginComponent,
    ChangePasswordComponent,
    PkComponent,
    LangulageComponent,
    ThemeComponent,
    InfoComponent,
    GrafKeyComponent,
    LockComponent,
    PinComponent,
    MainpageComponent,
    CursComponent,
    BotComponent,
    MapComponent,
    PayComponent,
    HomepageComponent,
    SellComponent,
    BuyComponent,
    AcStComponent,
    TranferComponent,
    EripComponent,
    FreePaymentComponent,
    MobilePaymentComponent,
    MenuMapComponent,
    ListMapComponent,
    CardComponent,
    StatPerComponent,
    StatisticComponent,
    AllDeposComponent,
    InfoNewsComponent,
    QrPayComponent,
    GenerateQrComponent,
    NotificationComponent
  ],
  imports: [
    NgxQRCodeModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleChartsModule,
    NgQrScannerModule,

    /* AgmCoreModule.forRoot({
       apiKey: 'AIzaSyCVRtkGXUOvDQlJPZUb3rcCRxdVWBNoW0c',
       libraries: ['places']
     }),*/
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgQrScannerModule,
    NgQRCodeReaderModule,

  ],
  providers: [NgQRCodeReaderModule],
  bootstrap: [AppComponent]
})
export class AppModule{

}
