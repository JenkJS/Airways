import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopingCartComponent } from './pages/index';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BookingModule } from './pages/booking/booking.module';
import { MaterialModule } from './material/material.module';
import { CartItemComponent } from './pages/shoping-cart/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopingCartComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    BookingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
