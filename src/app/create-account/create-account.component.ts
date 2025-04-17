import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
    
    account:Account=new Account();
    accountCreate=false;
    accountProblem=false;
    constructor(private accountService:AccountService,private router:Router){}
    
    onSubmit(){
      this.saveAccount();
      
    }
    
    saveAccount(){
      this.accountService.createAccount(this.account).subscribe(data=>{
       
        this.accountCreate=true;
        setTimeout(() =>{
          this.goToAccountList();
        },1000)
      },
      error => {
        if(error.status === 400){
        this.accountProblem=true;
        }
        
      }
    )
    }

    goToAccountList(){
      this.router.navigate(['/accounts'])
    }
}
