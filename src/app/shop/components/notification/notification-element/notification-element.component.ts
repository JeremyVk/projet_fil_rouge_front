import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notification } from 'src/app/shop/interfaces/notification';

@Component({
  selector: 'app-notification-element',
  templateUrl: './notification-element.component.html',
  styleUrls: ['./notification-element.component.css']
})
export class NotificationElementComponent implements OnInit {

  @Input() notification: Notification = {}
  @Output() deleteNotificationEmitter = new EventEmitter<Notification>()
  constructor() { }

  ngOnInit(): void {
    console.log(this.notification);
    
    setTimeout(() => {
      this.deleteNotificationEmitter.emit(this.notification)
    }, 4000);
  }
}
