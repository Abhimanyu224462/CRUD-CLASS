import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent {
  userRegForm!: FormGroup

  selectedBookingID: string | null = null
  actionName: string | null = null
  constructor(private fb: FormBuilder, private http: HttpService, private activateRoute: ActivatedRoute) {
    this.selectedBookingID = this.activateRoute.snapshot.paramMap.get('bookingID')
    // console.log("Param Data",this.activateRoute)
    this.actionName = this.activateRoute.snapshot.queryParamMap.get('action')
    console.log("action", this.actionName)
  }




  ngOnInit() {
    this.createFormStructure()
    // this.createBooking()
    if (this.actionName === 'EDIT') {
      this.getbookingDetails()
    }

  }

  save() {
    if (this.actionName === 'EDIT') {
      this.updateBooking()
    } else {
      this.createBooking()
      alert("New Booking Created")
    }
  }


  getbookingDetails() {
    const endpoint = 'bookings/' + this.selectedBookingID
    this.http.getDataFromServer(endpoint).subscribe({
      next: (response: any) => {
        console.log("response Data from ID:", response)
        this.userRegForm.patchValue(response)
      }
    })
  }

  updateBooking() {
    const endpoint = 'bookings/' + this.selectedBookingID
    const formData = this.userRegForm.value
    this.http.putDataToServer(endpoint, formData).subscribe({
      next: (response: any) => {
        console.log("data updated successfully")
        alert("Data Updated Successfully")
      },
      error: (error) => {
        console.log("error Occured", error)
      }

    })
  }



  createFormStructure() {
    this.userRegForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      source: ['', []],
      destination: ['', [Validators.required]],
      date: ['', [Validators.required]]
    })
  }

  submit() {
    console.log("Data from the Form", this.userRegForm.value)
    console.log("Entire Form Data", this.userRegForm)
  }

  reset() {
    this.userRegForm.reset()
  }

  createBooking() {
    var formData = this.userRegForm.value
    console.log("Data from Db", this.userRegForm.value)
    console.log("Data from Form", this.userRegForm)
    this.http.postDataFromServer('bookings', formData).subscribe({
      next: (response: any) => {
        console.log("Response Recieved", response)
      },
      error: (error) => {
        console.log("error Occured", error)
      }

      // complete:()=>{

      // }

    })
  }

}
