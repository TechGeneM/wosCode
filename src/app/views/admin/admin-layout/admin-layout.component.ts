import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/auth/_models/user';
import { AuthService } from 'src/app/core/auth/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  userData: User;
  userName: string;
  userRole: string;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // this.getUserDetails();
    this.getlocalUserDetails();
  }

  getlocalUserDetails(): void {
    console.log('In local user details ');
    this.userName = 'Name';
    this.userRole = 'Admin';
  }

  getUserDetails(): void {
    console.log('In getUserDetails method in the component');
    this.userData = JSON.parse(sessionStorage.getItem('user'));
    console.log('user details from storage is ' + this.userData.fullName);
    this.userName = this.userData.fullName;
    if (this.userData.role.includes('@@')) {
      this.userRole = this.userData.role.split('@')[0];
      console.log('agentRole is ' + this.userRole);
    }
  }

  signOut(): void {
    console.log('In signOut method');
    this.authService.signOut();
    this.router.navigateByUrl('logout');
  }

}
