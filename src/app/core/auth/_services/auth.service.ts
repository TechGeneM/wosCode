import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Userresponse } from '../_models/userresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User;
  constructor(private http: HttpClient) { }

  callSessionToken(): Observable<HttpResponse<Userresponse>> {
    console.log('In callSessionToken method and url is ' + environment.appUrl + '/sessionToken');
    return this.http.get<Userresponse>(environment.appUrl + '/sessionToken', { observe: 'response' });
  }

  signOut(): void {
    sessionStorage.removeItem('user');
    this.userData = null;
  }

  get currentUser(): User {
    if (!this.userData) {
      this.userData = JSON.parse(sessionStorage.getItem('user'));
      console.log('In current user method, user details are' + this.userData.emailID);
    }
    return this.userData;
  }

  get isSignedIn(): boolean {
    console.log('I am in isSignedIn method');
    return this.currentUser.emailID != null;
  }
}
