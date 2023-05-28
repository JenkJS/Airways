import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() cartItems!: any;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<number>();
  @Output() checkItemPrice = new EventEmitter<boolean>();

  onDelete(index: number) {
    this.deleteEvent.emit(index);
  }

  onEdit(index: number) {
    this.editEvent.emit(index);
  }

  onCheckItemPrice(isChecked: any){
    this.checkItemPrice.emit(isChecked)
  }
}
