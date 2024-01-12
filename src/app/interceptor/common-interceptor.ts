import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() {}
data!:string | null
  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
if(request.url.includes('admin')){
  this.data=localStorage.getItem('admin-infoTech')
}else if(request.url.includes('super-admin')){
    this.data=localStorage.getItem('super-infoTech')
}else{
  this.data=localStorage.getItem('infoTech')
}
 
    if(this.data){
     let tokennized=request.clone({
      setHeaders:{
        Authorization:`${this.data}`
      }
     })
     return next.handle(tokennized);
    }else{
      return next.handle(request);
    }
  }
}
