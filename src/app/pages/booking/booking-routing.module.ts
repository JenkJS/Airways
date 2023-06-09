import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent, BookingPassengersComponent, BookingJourneyComponent } from '../../pages/index';

const routes: Routes = [
  {
    path: '', component: BookingComponent,
    children: [
      { path: 'flights', component: BookingJourneyComponent },
      { path: 'passengers', component: BookingPassengersComponent },
      // { path: 'review-payment', component: BookingReviewPaymentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
