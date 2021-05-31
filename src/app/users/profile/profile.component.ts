import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }
  user = this.tokenService.getUser();
  tokenIssued = this.user[".issued"];
  tokenExpires = this.user[".expires"];
  ngOnInit(): void {
  }
  submitSignOut(){
    this.router.navigate([''])
    this.tokenService.signOut();
    this.authService.signout().subscribe(
      (success) => {console.log(success)},
      (err) => {console.log(err)}
    )
    
  }
}
