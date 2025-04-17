import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../register';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  register:Register=new Register();
  conf_password:string='';
  constructor(private router:Router,private accountService:AccountService){}

  login(event : Event)
  {
    event.preventDefault();
    this.router.navigate(['/login'])
  }
 
  registerdata() {
    this.accountService.register(this.register).subscribe(
      (response) => {
        this.register.email='';
        this.register.gender='';
        this.register.name='';
        this.register.password='';
        this.conf_password='';
        // Log the response to check what is coming back
        alert(`message: ${response}`);
      },
      (error) => {
        console.error('Error:', error);  // Log any error if something goes wrong
      }
    );
  }
  


}
