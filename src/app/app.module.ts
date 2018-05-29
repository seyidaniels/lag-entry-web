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


@NgModule({
  declarations: [
    AppComponent,
    MockComponent,
    StatComponent,
    DashboardComponent,
    ProfileComponent,
    TestComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgProgressModule,
    HttpModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
