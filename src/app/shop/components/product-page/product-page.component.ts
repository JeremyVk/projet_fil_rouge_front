import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Article } from '../../interfaces/article';
import { BaseVariant } from '../../interfaces/baseVariant';
import { Book } from '../../interfaces/book';
import { CartService } from '../../services/cart/cart.service';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { ProductService } from '../../services/product/product.service';
import { Notification } from 'src/app/shop/interfaces/notification';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  article: Article = {};
  variants: Array<BaseVariant> = [];
  selectedVariant: BaseVariant = {};
  loadingData: boolean = true;
  imageUrl: string = environment.productImagesUrl

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationsService
    ) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('productId'))!;
    this.getBook(id);
  }

  getBook(id:number) {
    this.productService.findBookById(id).subscribe(res => {
      this.article = res;
      this.variants = this.article.variants ? this.article.variants : []
      this.selectedVariant = this.variants[0];
      this.loadingData = false;
      })
  }

  changeSelectedVariant(variant: BaseVariant) {
    this.selectedVariant = variant;
  }

  addToCart() {
    this.cartService.addProductToCart(this.selectedVariant);
    let notification: Notification = {}
    notification.text = "Votre article a bien été ajouté au panier"
    this.notificationService.pushNotification(notification)
  }
}
