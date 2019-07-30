import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { SignUpInfo } from "src/app/services/auth/signup-info";
import * as firebase from 'firebase';
import {PhoneNumber} from '../../models/PhoneNumber';
import {WindowService} from '../../services/window.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = "";
  signUpFormGroup: FormGroup;
  phoneNumberFormGroup:FormGroup;
  otpFormGoup:FormGroup;


  windowRef:any;
  phoneNumber = new PhoneNumber();
  number:string;
  user: any;
  verificationCode: string;
  isRealVerificationCode = false;
  showFormSignUp = false;
  showFormPhoneNumber = true;
  showFormCheckOTP = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private win: WindowService
  ) {}

  ngOnInit() {
    this.signUpFormGroup = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(7)]],
      username: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      confirmPassword: ""
    });
    this.phoneNumberFormGroup = this.fb.group({
      phoneNumber: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
    });
    this.otpFormGoup = this.fb.group({
      otp:""
    });


    this.windowRef = this.win.windowRef;
    if (!firebase.apps.length) {
      const new_fire = firebase.initializeApp(environment.firebase);
    }
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render()
  }

  onSubmit() {
    if (this.signUpFormGroup.valid) {
      this.signupInfo = new SignUpInfo(
        this.signUpFormGroup.get("name").value,
        this.signUpFormGroup.get("username").value,
        this.signUpFormGroup.get("email").value,
        this.number,
        this.signUpFormGroup.get("password").value
      );
      // this.sendLoginCode('84',this.signUpFormGroup.get("phoneNumber").value);
      console.log(this.signupInfo);
      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          alert("Sign up successful!");
          this.router.navigate(["/"]);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    } else {
      console.log("Dinh dang sai!");
    }
  }
  onSubmitFormPhoneNumber() {
    if (this.phoneNumberFormGroup.valid) {
      this.sendLoginCode('84',this.phoneNumberFormGroup.get("phoneNumber").value);
        this.showFormPhoneNumber = false;
        this.showFormCheckOTP = true;
        this.number =this.phoneNumberFormGroup.get("phoneNumber").value;
    }

  }
  onSubmitFormOTP(){
    this.verifyLoginCode(this.otpFormGoup.get("otp").value);
  }



  sendLoginCode(country:string,number:string) {
    this.phoneNumber.number= number;
    this.phoneNumber.country= country;
    const appVerifier = this.windowRef.recaptchaVerifier;
    console.log(this.phoneNumber.e164);
    firebase.auth().signInWithPhoneNumber(this.phoneNumber.e164, appVerifier)
      .then(result => {
        console.log(result);
        this.windowRef.confirmationResult = result;
      })
      .catch( error => console.log(error) );

  }
  //
  verifyLoginCode(verificationCode:string) {
    this.windowRef.confirmationResult
      .confirm(verificationCode)
      .then( result => {
        this.verificationCode = verificationCode;
        this.showFormSignUp=true;
        this.showFormCheckOTP = false;
        console.log(result)
      })
      .catch( error => {
        alert("Invalid verification code");
        console.log(error, "ERROR Invalid code")
      })
    ;
  }
}
