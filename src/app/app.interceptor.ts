import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("request intercepted" , request)

    const token = "kfjkhdjfjf654564654"
    request = request.clone({setHeaders:{"authorisation": token}})

    return next.handle(request).pipe(catchError(this.handleHttpError));
  }

  private handleHttpError (errorResponse:HttpErrorResponse){
    console.log(errorResponse)

    if(errorResponse.error instanceof ErrorEvent){
      console.log("Client side error" + errorResponse.error.message)
    } else {
      console.log("server side error" + errorResponse.message)
    }

    return throwError ("Interceptor says: We are unable to process your request, please try after some time")

  }
}
