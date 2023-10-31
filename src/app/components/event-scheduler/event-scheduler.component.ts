import {
  Component,
  signal,
  ChangeDetectorRef,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from 'src/app/classes/event-utils';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-event-scheduler',
  templateUrl: './event-scheduler.component.html',
  styleUrls: ['./event-scheduler.component.scss']
})
export class EventSchedulerComponent {
  @ViewChild('external') external: ElementRef | any;
  TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
  events: any = [
      {
      id: createEventId(),
      title: 'Sharon Test event',
      start: this.TODAY_STR + 'T05:00:00',
      end: this.TODAY_STR + 'T06:00:00'
    }

    // {
    //   id: createEventId(),
    //   title: 'Software Check-in',
    //   start: '2023-10-20T11:45:00-04:00',
    //   end: '2023-10-20T12:15:00-04:00',
    // },
    // {
    //   id: createEventId(),
    //   title: 'TMA- Team Stand Up',
    //   start: '2023-10-20T12:15:00-04:00',
    //   end: '2023-10-20T12:45:00-04:00',
    // },
  ];

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'timeGridDay',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    droppable: true,
    slotDuration: '01:00:00',
    events: this.events,

    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventDragStop: this.handleEventDropStop.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });

  currentEvents = signal<EventApi[]>([]);

  done = [
    'Stand up Meeting',
    'Sprint Planning',
    'Task on POC',
    'Check e-mail',
    'Testing',
  ];
  toDoEvents = [
    { id: 1, title: 'Stand up Meeting', duration: '00:15' },
    { id: 2, title: 'Sprint Planning', duration: '02:00' },
    { id: 3, title: 'Task on POC', duration: '01:00' },
    { id: 4, title: 'Check e-mail', duration: '00:30' },
    { id: 5, title: 'Testing', duration: '02:30' },
  ];

  eventList = [
    { id: 1, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :false},
    { id: 2, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :false},
    { id: 3, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :false},
    { id: 4, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :false},
    { id: 5, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :false},
    { id: 6, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :true},
    { id: 7, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :true},
    { id: 8, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :true},
    { id: 9, name: 'Integration Event Name', time: '10:00AM', projectName :  'PROJECT NAME',description :'Some other data', isBlue :true},
  ]

  constructor(private changeDetector: ChangeDetectorRef, private sharedService:  SharedService) {
    // const channel = new BroadcastChannel('clientEventsData');
    // channel.addEventListener('message', (event) => {
    //   console.log(event.data);
    //   event.data.forEach((element: any) => {
    //     element.id = createEventId();
    //     this.events.push(element);
    //   });
    //   console.log(this.events);

    
    // });

    console.log(this.TODAY_STR);
    console.log(this.TODAY_STR + 'T05:00:00');

    this.sharedService.getGoogleClientEvents().subscribe((value: any) => {
      console.log(value);
      value.forEach((element: any) => {
        element.id = createEventId();
        this.events.push(element);
      });
    });
  }

  ngAfterViewInit() {
    new Draggable(this.external.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
          duration: eventEl.id,
        };
      },
    });
    console.log(INITIAL_EVENTS);
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    console.log(events);
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  handleEventDrop(eventDropInfo: any) {
    console.log(eventDropInfo);
  }

  handleEventDropStop(eventDropInfo: any) {
    console.log(eventDropInfo);
  }

}
