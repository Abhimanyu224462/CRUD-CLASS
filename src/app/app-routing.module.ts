import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

const routes: Routes = [
  {path:'create-booking',component:CreateBookingComponent},
  {path:'booking-details',component:BookingDetailsComponent},
  {path:'edit-booking/:bookingID',component:CreateBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
