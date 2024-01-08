import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  baseUrl: string ="http://localhost:3000/"

  httpHeaders:HttpHeaders = new HttpHeaders({
    "content-type":"application/json"
  })

  

  getDataFromServer(endpoint:string){
    const url = this.baseUrl + endpoint
    
    return this.httpClient.get(url,{headers:this.httpHeaders}).pipe(catchError(this.handleHttpError));
  }

  postDataFromServer(endpoint:string,requestBody:any):Observable<any>{
    const url = this.baseUrl + endpoint
    
    return this.httpClient.post(url,requestBody,{headers:this.httpHeaders}).pipe(catchError(this.handleHttpError));
  }

  putDataToServer(endpoint:string,requestBody:any):Observable<any>{
    const url = this.baseUrl + endpoint

    return this.httpClient.put(url,requestBody,{headers:this.httpHeaders}).pipe(catchError(this.handleHttpError));
  }

  deleteDataFromServer(endpoint:string):Observable<any>{
    const url = this.baseUrl + endpoint

    return this.httpClient.delete(url,{headers:this.httpHeaders}).pipe(catchError(this.handleHttpError));
  }

  private handleHttpError (errorResponse:HttpErrorResponse){
    console.log(errorResponse)

    if(errorResponse.error instanceof ErrorEvent){
      console.log("Client side error" + errorResponse.error.message)
    } else {
      console.log("server side error" + errorResponse.message)
    }

    return throwError ("We are unable to process your request, please try after some time")

  }

 
}
