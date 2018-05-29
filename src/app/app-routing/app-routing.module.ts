import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from '../app.component';
import { StatComponent } from '../stat/stat.component';
import { MockComponent } from '../mock/mock.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { TestComponent } from '../test/test.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {path: 'stat', component: StatComponent},
  {path: 'mock', component: MockComponent},
  {path: 'test/:subject/:number', component: TestComponent},
  {path: 'profile/:username', component: ProfileComponent}
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
