import { Component } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Route, Router } from '@angular/router';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BANKING APP';
  
  constructor(private userAuthService:UserAuthService,private  router:Router,public accountService:AccountService){}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
}
