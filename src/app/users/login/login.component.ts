import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }
  date = new Date();
  login = {
    username: '',
    password: '',
  }
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage = '';
  ngOnInit(): void {
    if(this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/tasks/'])
    }
  }

  submitLogin() {
    this.authService.login(this.login)
    .subscribe((user) => {
      this.router.navigate(['/tasks/'])
      this.tokenService.saveToken(user.access_token);
      this.tokenService.saveUser(user);
      
      this.isLoginFailed = false;
      this.isLoggedIn = true;
    },
    (err) => {
      console.log(err);
      this.isLoginFailed = true;
    }
    )
  }
}
