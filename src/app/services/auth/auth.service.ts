import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import {ProfileInfo} from "./profile-info";
import {CodeResponse} from '../../models/response/CodeResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/signin';
  private signupUrl = 'http://localhost:8080/signup';
  private profileUrl = 'http://localhost:8080/update-profile';
  private getUserProfileByToken = 'http://localhost:8080/profile/user/curren';
  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  profile(info: ProfileInfo, headers:HttpHeaders): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(this.profileUrl, info,{headers});
  }
  getUserProfile(headers:HttpHeaders):Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>(this.getUserProfileByToken, {headers})
  }
}
