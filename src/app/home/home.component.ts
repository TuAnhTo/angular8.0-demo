import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "../services/auth/token-storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  info: any;
  isLogin = false;
  constructor(private token: TokenStorageService) {}

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.checkLogin();
  }
  logout() {
    this.token.signOut();
    this.isLogin = false;
    window.location.reload();
  }
  checkLogin() {
    if (
      sessionStorage.getItem("AuthToken") != null &&
      sessionStorage.length != 0
    ) {
      this.isLogin = true;
    }
  }
}
