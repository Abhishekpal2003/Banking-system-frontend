import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent {

  accounts:Account[]=[];
  constructor(private accountService:AccountService,private router:Router){}
  search:any;  

  ngOnInit(){
    this.getAccounts();
  }

  
  searchByAcc(){
    if((this.search) > 0){
    this.accountService.searchByAcc(this.search).subscribe(data=>{
      this.accounts=data;
      
    })
  }
  else{
    this.getAccounts();
  }
  }


  export(): void {
    this.accountService.exportData(this.accounts);
  }

  
  getAccounts(){
    this.accountService.getAllAccounts().subscribe(data=>{
      this.accounts=data;
      
    })
    
  }

  deposit(id:number){
      this.router.navigate(['/deposit',id]);
  }

  withdraw(id:number){
    this.router.navigate(['/withdraw',id]);
  }
  
  delete(id:number){
    this.accountService.delete(id).subscribe(data=>{
        
        this.getAccounts();
    });
  }

  view(id:number)
  {
    this.router.navigate(['/account-details',id]);
  }

  

}
