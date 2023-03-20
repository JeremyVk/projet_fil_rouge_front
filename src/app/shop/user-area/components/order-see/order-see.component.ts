import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shop/interfaces/order';
import { OrderService } from 'src/app/shop/services/order/order.service';
import { UserService } from 'src/app/shop/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-see',
  templateUrl: './order-see.component.html',
  styleUrls: ['./order-see.component.css']
})
export class OrderSeeComponent implements OnInit {

  id: Number|null = null;
  legacy: boolean = false;
  order: Order = {};
  error: string = '';
  taxAmount: number = 0;
  imageUrl:string = environment.productImagesUrl

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = null
    this.id = Number(this.route.snapshot.paramMap.get('orderId'));
    
    if (this.id !== null) {
      this.orderService.findOrderById(this.id).subscribe({
        next: res => {
          this.order = res;
          this.checkIfLegacy()
          this.taxAmount = this.orderService.calculateTotalTax(this.order);
          console.log(this.order);
        },
        error: e => {
          this.router.navigateByUrl('/')
        }
      })
    }
  }

  checkIfLegacy() {    
    this.userService.userSubject$.subscribe(res => {
      if (this.order?.user?.id !== res.id) {
        this.router.navigateByUrl('/')
      }
    }) 
  }

  downloadInvoice(orderId: number) {
    return this.orderService.getOrderInvoice(orderId).subscribe({
      next: res => {
        if (res.body === null) return

        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(res.body)
        link.target = '_blank'
        link.click();      
      },
      error: e => {
        this.error = "Une erreur est survenue, Votre facture n'est pas disponible pour le moment"
      }
    })
  }


}
