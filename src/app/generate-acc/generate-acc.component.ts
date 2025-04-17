import { Component } from '@angular/core';
import { Generate } from '../generate';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-generate-acc',
  templateUrl: './generate-acc.component.html',
  styleUrl: './generate-acc.component.css'
})
export class GenerateAccComponent {
   generate:Generate=new Generate();
  constructor(private accountService:AccountService,private router:Router){}

  AccountNo:number=0;
  accountCreate=false;
  generate1() {
    const digits = '0123456789';
    let randomNumber = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      randomNumber += digits[randomIndex];
    }

    // Convert the randomNumber to a number and store it in AccountNo
    this.generate.accountNumber = Number(randomNumber);
  }

  onSubmit()
  {
    this.saveGenerateAcc();
  }

  saveGenerateAcc()
  {
    this.accountService.generateAccountNo(this.generate).subscribe(data=>{
      
      this.accountCreate=true;
      this.generate=new Generate();
      
    })
  }

}