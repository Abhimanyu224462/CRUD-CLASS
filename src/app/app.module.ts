import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppInterceptor } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CreateBookingComponent,
    BookingDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    useClass:AppInterceptor,
    provide:HTTP_INTERCEPTORS,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
