import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notificationSubject$ = new BehaviorSubject<string[]>([]);

  constructor() { }

  pushNotification(notification: string) {
    let notifications = this.notificationSubject$.getValue();
    notifications.push(notification);
    this.notificationSubject$.next(notifications)
  }
}
