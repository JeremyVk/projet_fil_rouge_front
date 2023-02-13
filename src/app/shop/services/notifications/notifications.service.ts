import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from '../../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notificationSubject$ = new BehaviorSubject<Notification[]>([]);
  i: number = 0;

  constructor() { }

  pushNotification(notification: Notification) {
    let notifications = this.notificationSubject$.getValue();
    notifications.push(notification);
    this.notificationSubject$.next(notifications)
  }

  deleteNotification(notification: Notification) {    
    let notifications = this.notificationSubject$.getValue().filter(elt => elt.id !== notification.id);
    this.notificationSubject$.next(notifications);
  }
}
