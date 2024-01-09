import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
   
  private http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  /**
   * @description -API function for user signup
   * @param data -User details
   * @returns 
   */
  register(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`,data);            
  }

  /**
  * @description -API function for user login
  * @param data -User details
  * @returns 
  */
  login(data:FormData):Observable<{jwttoken:string,verify:boolean,message:string}>{
    return this.http.post<{jwttoken:string,verify:boolean,message:string}>(`${this.apiUrl}/login`,data)
  }

   /**
   * @description -API function for resend OTP
   * @param data -User email id
   */
  resendOtp(emailId:string): Observable<{success:boolean,message:string}>{
    return this.http.post<{success:boolean,message:string}>(`${this.apiUrl}/resend-otp`,{email:emailId});   
  }

  /**
  * @description -API function for Submit OTP
  * @param data -User email id
  */
  submitOtp(data:{email:string,otp:number}): Observable<{jwttoken:string}>{
      return this.http.post<{jwttoken:string}>(`${this.apiUrl}/otp-verification`, data);   
  }




                        /**
                         * Admin authentication
                         */


  
  /**
  * @description -API function for admin login
  * @param data -admin details
  * @returns 
  */
  adminLogin(data:FormData):Observable<{jwttoken:string,verify:boolean}>{
    return this.http.post<{jwttoken:string,verify:boolean}>(`${this.apiUrl}/admin/login`,data)
  }

   /**
  * @description -API function for admin registration
  * @param data -admin details
  * @returns 
  */
  adminRegister(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/register`,data);            
  }



                       /**
                         * Super admin authentication
                         */

  /**
  * @description -API function for usper admin login
  * @param data - su-admin details
  * @returns 
  */
  suAdminLogin(data:FormData):Observable<{jwttoken:string,verify:boolean}>{
    return this.http.post<{jwttoken:string,verify:boolean}>(`${this.apiUrl}/suAdmin/login`,data)
  }

 
}
