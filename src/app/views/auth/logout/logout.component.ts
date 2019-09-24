import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/auth/_models/user';
import { AuthService } from 'src/app/core/auth/_services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }


  ngOnInit() {
  }

  login() {
    console.log('redirecting to login component');
    this.router.navigateByUrl('');
  }
}
