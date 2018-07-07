import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
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
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CountDown} from 'ng4-date-countdown-timer';
import { TimeComponent } from './time/time.component';
import { ResultComponent } from './result/result.component';
import { AuthService } from './auth.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MockResultComponent } from './mock-result/mock-result.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AboutComponent } from './about/about.component';
import { AggregateComponent } from './aggregate/aggregate.component';
import {ExamObject} from './exam/examobject';
import { Validation } from './Validation';
import { Helper } from './Helpers';




@NgModule({
  declarations: [
    AppComponent,
    MockComponent,
    StatComponent,
    DashboardComponent,
    ProfileComponent,
    TestComponent,
    CountDown,
    TimeComponent,
    ResultComponent,
    AuthenticationComponent,
    MockResultComponent,
    ServerErrorComponent,
    AboutComponent,
    AggregateComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgProgressModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [AppService, AuthService, Validation, Helper],
  bootstrap: [AppComponent]
})
export class AppModule {
}
