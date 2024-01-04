import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent {
  userRegForm!:FormGroup
  constructor(private fb:FormBuilder, private http:HttpService){

  }

ngOnInit(){
  this.createFormStructure()
  // this.createBooking()
}

createFormStructure(){
  this.userRegForm = this.fb.group({
    customerName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
    source:['',[]],
    destination:['',[Validators.required]],
    date:['',[Validators.required]]
  })
}

submit(){
  console.log("Data from the Form", this.userRegForm.value)
  console.log("Entire Form Data", this.userRegForm)
}

reset(){
  this.userRegForm.reset()
}

createBooking(){
  var formData = this.userRegForm.value
  console.log("Data from Db", this.userRegForm.value)
  console.log("Data from Form", this.userRegForm)
  this.http.postDataFromServer('bookings',formData).subscribe({
    next:(response:any)=>{
      console.log("Response Recieved", response)
    },
    error:(error)=>{
      console.log("error Occured", error)
    }
   
    // complete:()=>{

    // }

  })
}

}
