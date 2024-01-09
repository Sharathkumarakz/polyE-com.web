import { Component, OnInit, inject } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit{

  /**
   * dependancy injection
   */
  private authService = inject(AuthServiceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  private emailId : string =''

  /**
   * Otp digits
   */
  otp1:string ='';
  otp2:string ='';
  otp3:string ='';
  otp4:string ='';
  otp5:string ='';
  otp6:string ='';

  /**
   * component initialization
   */
  ngOnInit(): void {
      this.emailId = this.route.snapshot.queryParamMap.get('data')?? '';
  }

  /**
   * Method to resend otp
   */
  resendOpt(){
    this.authService.resendOtp(this.emailId).subscribe({
      next:(res)=>{
      this.toastr.success(res.message,"Success");
      },error:(err)=>{
        this.toastr.warning(err.error.message,"Warning");
      }
    });
  }

  /**
   * OTP submission
   */
  submitOtp(){
    const otpdigits = [this.otp1, this.otp2, this.otp3, this.otp4, this.otp5, this.otp6]; 
    const otp = otpdigits.join('');
    if(otp.length !== 6){
      this.toastr.warning("Please fill the OTP");
      return;
    }
    this.authService.submitOtp({email:this.emailId,otp:parseInt(otp)}).subscribe({
      next:(res) => {
        this.toastr.success("OTP verification successfull");
        setTimeout(() => {
          localStorage.setItem('shoppie', res.jwttoken);
          this.router.navigate(['/']);  
        }, 2000);
      },
      error:(err) => {
        this.toastr.warning(err.error.message);
      }
    })
  }
}
