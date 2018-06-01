import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgProgressModule } from 'ngx-progressbar';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MockComponent } from './mock/mock.component';
import { StatComponent } from './stat/stat.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {CountDown} from 'ng4-date-countdown-timer';
import { TimeComponent } from './time/time.component';



@NgModule({
  declarations: [
    AppComponent,
    MockComponent,
    StatComponent,
    DashboardComponent,
    ProfileComponent,
    TestComponent,
    CountDown,
    TimeComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    NgProgressModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
