import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {
  bookingData!:any
  constructor(private http:HttpService){}

  ngOnInit(){
    this.getData()
  }

  getData(){
    this.http.getDataFromServer("bookings").subscribe((response:any) => {
      if(response && response.length>0){
        this.bookingData = response
        console.log("Booking Data are:", this.bookingData)
      }
    })
  }
}
