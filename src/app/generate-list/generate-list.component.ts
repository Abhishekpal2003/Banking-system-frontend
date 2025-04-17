import { Component } from '@angular/core';
import { Generate } from '../generate';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-generate-list',
  templateUrl: './generate-list.component.html',
  styleUrl: './generate-list.component.css'
})
export class GenerateListComponent {
  generate:Generate[]=[];
  search:any; 
  constructor(private accountService:AccountService){}
  ngOnInit(){
    this.getAccounts();
  }

  getAccounts(){
    this.accountService.getAllAdminAccounts().subscribe(data=>{
      this.generate=data;
    })
  }

  export(): void {
    this.accountService.exportDataAdmin(this.generate);
  }

  searchByAcc(){
    if((this.search) > 0){
    this.accountService.searchByAccAdmin(this.search).subscribe(data=>{
      this.generate=data;
      
    })
  }
  else{
    this.getAccounts();
  }
  }

}
