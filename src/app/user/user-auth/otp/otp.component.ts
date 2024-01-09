import { Component, OnInit, inject } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
       console.log(res);
       
      },error:(err)=>{
      console.log(err);
      
      }
    });
  }

  submitOtp(){

    const otpdigits = [this.otp1, this.otp2, this.otp3, this.otp4, this.otp5, this.otp6];
    console.log(otpdigits); 
    const otp = otpdigits.join('');
    if(otp.length !== 6){
      console.log(otp); 
      
      return;
    }
    this.authService.submitOtp({email:this.emailId,otp:parseInt(otp)}).subscribe({
      next:(res) => {
        localStorage.setItem('shoppie', res.jwttoken);
        this.router.navigate(['/']);
      },
      error:(err) => {
        console.log("error");
        
      }
    })
  }
}
