import { Component, OnInit } from '@angular/core';
import { ReviewStateService } from 'src/app/core/services/review-state/review-state.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss'],
})
export class ShopingCartComponent implements OnInit {
  flightsCart: any = [];

  promoExample = [
    {
      promo: 'promo',
      discount: 15,
    },
  ];

  constructor(private reviewState: ReviewStateService) {}

  ngOnInit(): void {
    this.checkSelectedItems();
    this.getTotalPrice();
    this.reviewState.currentFlight.subscribe((el) => {
      this.flightsCart.push(el);
    });

  }

  total: number = 0;

  totalAfterDiscount: number = 0;

  promoInputValue!: string;

  isPromoInputEmpty!: boolean;

  isPromoInvalid!: boolean;

  deleteItem(index: number) {
    this.flightsCart.splice(index, 1);
  }

  editItem(event: number) {

  }

  checkItemsPrice(event: any) {
    let index: number = Number(event.source.id.split('_')[1]);
    this.flightsCart[index].isChecked = event.checked;
  }

  getTotalPrice() {
    this.total = 0;
    this.flightsCart.forEach((element: any) => {
      if (element.isChecked) {
        this.total = this.total + element.price;
      }
    });
    return this.total;
  }

  checkPromoCode() {
    if (this.promoInputValue === undefined) {
      this.isPromoInputEmpty = true;
    } else if (
      this.promoInputValue !== undefined &&
      this.promoInputValue !== this.promoExample[0].promo
    ) {
      this.isPromoInvalid = true;
    } else {
      this.totalAfterDiscount =
        this.total - (this.total * this.promoExample[0].discount) / 100;
      this.isPromoInvalid = false;
      return this.totalAfterDiscount;
    }
    return;
  }

  checkSelectedItems(): number {
    let counter: number = 0;
    this.flightsCart.forEach((el: any) => {
      if (el.isChecked) counter = counter + 1;
    });
    return counter;
  }

  checkAll() {

  }
}
