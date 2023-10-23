import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { TimeLogComponent } from './components/time-log/time-log.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { EnvisageTimelogComponent } from './components/envisage-timelog/envisage-timelog.component';

const routes: Routes = [  { path: 'login', component: LoginComponent },
{ path: 'timelog', component: TimeLogComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'error', component: ErrorComponent },
{ path: 'booking', component: BookingsComponent },
{ path: 'envisage-timelog', component: EnvisageTimelogComponent },
{ path: '', component: LoginComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
