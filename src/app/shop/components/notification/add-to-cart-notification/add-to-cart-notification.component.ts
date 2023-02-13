import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Notification } from 'src/app/shop/interfaces/notification';
import { NotificationsService } from 'src/app/shop/services/notifications/notifications.service';

@Component({
  selector: 'app-add-to-cart-notification',
  templateUrl: './add-to-cart-notification.component.html',
  styleUrls: ['./add-to-cart-notification.component.css']
})
export class AddToCartNotificationComponent implements OnInit, OnDestroy {
  activeNotifications: Notification[] = []
  private subscription = new Subscription();
  constructor(
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.notificationService.notificationSubject$.subscribe(res => {
      this.activeNotifications = res
    }))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteNotification(notification: Notification) {
    console.log(notification);
    
    this.notificationService.deleteNotification(notification)
  }
}
