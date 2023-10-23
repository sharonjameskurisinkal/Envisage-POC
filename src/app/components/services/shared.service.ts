import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public googleClientEvents = new BehaviorSubject<any>('');

  constructor() { }

  getGoogleClientEvents(): Observable<any> {
    return this.googleClientEvents.asObservable();
  }

  setGoogleClientEvents(newValue: any): void {
    this.googleClientEvents.next(newValue);
  }

}
