import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/_services/auth.service';
import { User } from 'src/app/core/auth/_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: User;
  userName: string;
  userRole: string;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    console.log('In constructor method of login component');
  }

  ngOnInit() {
    console.log('In ngOnInit method of login component');
    // this.userSignIn();
    this.signIn();
  }

  signIn(): void {
    console.log('In local signin method');
    this.router.navigateByUrl('adminhome');
  }

  userSignIn(): void {
    console.log('In userSignIn method in component');
    this.userName = 'Gene';
    this.authService.callSessionToken().subscribe(resp => {
      console.log('response status is ' + resp.body.status);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetching data');
        this.userData = new User(
          resp.body.data[0].userId,
          resp.body.data[0].emailID,
          resp.body.data[0].nickname,
          resp.body.data[0].imageUrl,
          resp.body.data[0].sessionToken,
          resp.body.data[0].role,
          resp.body.data[0].authDomain,
          resp.body.data[0].firstName,
          resp.body.data[0].lastName,
          resp.body.data[0].fullName
        );
        console.log('response object ' + JSON.stringify(resp.body.data[0]));
        console.log('User response object ' + JSON.stringify(this.userData));
        console.log('User signin success' + this.userData.fullName);
        console.log('response has ' + resp.body.data[0].emailID + ' ' + resp.body.data[0].fullName);
        console.log('User details are ' + this.userData.emailID + ' ' + this.userData.fullName);
        this.userName = this.userData.fullName;
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        console.log('User ' + this.userName + ' is signed in and verifying role');
        if (this.userData.role.includes('@@')) {
          this.userRole = this.userData.role.split('@')[0];
          console.log('role of user logged in is ' + this.userRole);
          if (this.userRole.localeCompare('Admin') === 0) {
            this.router.navigateByUrl('teamsettings');
          } else if (this.userRole.localeCompare('supervisor') === 0) {
            this.router.navigateByUrl('supervisorhome');
          } else if (this.userRole.localeCompare('Agent') === 0) {
            this.router.navigateByUrl('agenthome');
          }
        } else {
          console.log('Unable to verify user');
          this.userData = null;
          this.router.navigateByUrl('unauthorized');
        }
      }
    });
  }

}
