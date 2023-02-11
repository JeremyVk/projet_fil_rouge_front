import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/shop/services/notifications/notifications.service';

@Component({
  selector: 'app-add-to-cart-notification',
  templateUrl: './add-to-cart-notification.component.html',
  styleUrls: ['./add-to-cart-notification.component.css']
})
export class AddToCartNotificationComponent implements OnInit, OnDestroy {
  activeNotifications: string[] = []
  private subscription = new Subscription();
  constructor(
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.notificationService.notificationSubject$.subscribe(res => {
      this.activeNotifications = res
    }))
        setInterval(() => {
          if (this.activeNotifications.length > 0) {
            this.activeNotifications.splice(0, 1)
          }
        }, 3000)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
