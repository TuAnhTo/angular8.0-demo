import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { ProfileInfo } from "src/app/services/auth/profile-info";
import { TokenStorageService } from "src/app/services/auth/token-storage.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  form: any = {};
  profileInfo: ProfileInfo;
  isProfileInfo = false;
  isProfileFailed = false;
  errorMessage = "";
  profileFormGroup: FormGroup;
  isLogin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenStorageService
  ) {}

  ngOnInit() {
    this.profileFormGroup = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(7)]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern("^[0-9]{10}$")]
      ]
    });
    const header = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("AuthToken")}`
    });
    this.authService.getUserProfile(header).subscribe(
      response => {
        this.profileInfo = response;
      },
      error => {
        console.log(error);
      }
    );
    this.checkLogin();
  }
  onSubmit() {
    if (this.profileFormGroup.valid) {
      this.profileInfo = new ProfileInfo(
        this.profileFormGroup.get("name").value,
        this.profileFormGroup.get("email").value,
        this.profileFormGroup.get("phoneNumber").value
      );
      console.log(this.profileInfo);
      const header = new HttpHeaders({
        Authorization: `Bearer ${sessionStorage.getItem("AuthToken")}`
      });
      this.authService.profile(this.profileInfo, header).subscribe(
        data => {
          console.log(data);
          this.isProfileInfo = true;
          this.isProfileFailed = false;
          alert("update profile successful!");
          this.router.navigate(["/home"]);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isProfileFailed = true;
        }
      );
    }
  }
  checkLogin() {
    if (
      sessionStorage.getItem("AuthToken") != null &&
      sessionStorage.length != 0
    ) {
      this.isLogin = true;
    } else {
      this.router.navigate(["/home"]);
    }
  }
  logout() {
    this.token.signOut();
    this.isLogin = false;
    window.location.reload();
  }
}
