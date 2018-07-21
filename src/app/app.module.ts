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
import { TimeComponent } from './time/time.component';
import { ResultComponent } from './result/result.component';
import { AuthService } from './auth.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MockResultComponent } from './mock-result/mock-result.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AboutComponent } from './about/about.component';
import { AggregateComponent } from './aggregate/aggregate.component';
import { Validation } from './Validation';
import { Helper } from './Helpers';
import { AuthGuardService } from './auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService, JwtModuleOptions } from '../../node_modules/@auth0/angular-jwt';


export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    MockComponent,
    StatComponent,
    DashboardComponent,
    ProfileComponent,
    TestComponent,
    TimeComponent,
    ResultComponent,
    AuthenticationComponent,
    MockResultComponent,
    ServerErrorComponent,
    AboutComponent,
    AggregateComponent,
  ],
  imports: [
    // ...
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200']
      }
    }),

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
  providers: [AppService, AuthService, Validation, Helper, AuthGuardService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
