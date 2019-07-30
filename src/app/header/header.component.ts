import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../services/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;

  constructor(private token: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    this.checkLogin();
  }

  logout() {
    this.token.signOut();
    this.isLogin = false;
    this.router.navigate(['/']);
  }

  checkLogin() {
    if (sessionStorage.getItem('AuthToken') != null && sessionStorage.length != 0) {
      this.isLogin = true;
    }
  }
}
