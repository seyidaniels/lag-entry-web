import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from '../app.component';
import { StatComponent } from '../stat/stat.component';
import { MockComponent } from '../mock/mock.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { TestComponent } from '../test/test.component';
import { ProfileComponent } from '../profile/profile.component';
import {ResultComponent} from '../result/result.component';
import { MockResultComponent } from '../mock-result/mock-result.component';
import { ServerErrorComponent } from '../server-error/server-error.component';
import { AboutComponent } from '../about/about.component';
import { AggregateComponent } from '../aggregate/aggregate.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {path: 'stat', component: StatComponent},
  {path: 'mock', component: MockComponent},
  {path: 'test/:subject/:number', component: TestComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'result/:randomGen', component: ResultComponent},
  {path: 'mock-result/:randomGen', component: MockResultComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'about-unilag', component: AboutComponent},
  {path: 'aggregate', component: AggregateComponent}
 ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class AppRoutingModule { }
