import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Login } from '../login';
import { UserAuthService } from '../user-auth.service';
// import * as jwt_decode from 'jwt-decode'; // Import jwt-decode
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected to styleUrls
})
export class LoginComponent {
  login: Login = new Login(); // Initialize login object

  constructor(
    private router: Router,
    private accountService: AccountService,
    private authService: UserAuthService
  ) {}

  // Navigate to the registration page
  redirectToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  

  // Method to handle login
  logindata() {
    this.accountService.login(this.login).subscribe(
      (response: any) => {
        // Set the JWT token in the auth service
        this.authService.setToken(response.jwt);
        

        // Decode the JWT token
        const decodedToken: any = jwt_decode(response.jwt);
        const role: string = decodedToken.role; // Extract the role from the decoded token
        
        // Set the roles in the auth service
         this.authService.setRoles(role);

        // Redirect based on the role
        if (role == 'ROLE_ADMIN' || role == 'ROLE_USER') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
