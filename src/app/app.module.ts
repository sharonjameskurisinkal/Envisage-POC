import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeLogComponent } from './components/time-log/time-log.component';
import { EnvisageTimelogComponent } from './components/envisage-timelog/envisage-timelog.component';
import { LoginComponent } from './components/login/login.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { EventSchedulerComponent } from './components/event-scheduler/event-scheduler.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ErrorComponent,
    TimeLogComponent,
    UserCardComponent,
    BookingsComponent,
    EnvisageTimelogComponent,
    SideNavbarComponent,
    EventSchedulerComponent,
    TopNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
