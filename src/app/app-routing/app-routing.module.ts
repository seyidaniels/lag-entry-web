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
import {AuthGuardService as AuthGuard} from '../auth-guard.service';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'mock', component: MockComponent, canActivate: [AuthGuard]},
  {path: 'test/:subject/:number', component: TestComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'result/:randomGen', component: ResultComponent, canActivate: [AuthGuard]},
  {path: 'mock-result/:randomGen', component: MockResultComponent, canActivate: [AuthGuard]},
  {path: 'server-error', component: ServerErrorComponent, canActivate: [AuthGuard]},
  {path: 'about-unilag', component: AboutComponent,  canActivate: [AuthGuard]},
  {path: 'aggregate', component: AggregateComponent, canActivate: [AuthGuard]},
 ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class AppRoutingModule { }
