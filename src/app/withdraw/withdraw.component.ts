import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent {
  message: string | null = null;  // Allow `message` to be `null`
  pdfFile: Blob | null = null;
  id:number=0;
  withdraw1:number=0;
  account:Account=new Account();
  constructor(private accountService:AccountService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(){
    this.id=this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data=>{
      this.account=data;
      
    })
  }

  successMessage="";
  errorMessage="";
  error1Message="";

  
  onSubmit(){
    
    if(this.isValidAmount(this.withdraw1)){
      this.account.balance=this.withdraw1;
    this.accountService.Withdraw(this.id,this.account.balance).subscribe(response=>{
      // Handle the PDF Blob (which is in the response body)
      const pdfBlob = response.body;

      // Handle headers (message and entity)
      this.message = response.headers.get('message');
      const accountJson = response.headers.get('entity');
      
      if (accountJson) {
        this.account = JSON.parse(accountJson);  // Parse JSON string back to object
      }

      if (this.message === 'Successfully done') {
        this.successMessage = 'Deposit SuccessFully..!';
      } else {
        this.errorMessage = 'Deposit UnSuccessFully..!';
      }
      setTimeout(()=>{
                  this.router.navigate(['/accounts']);
                },1000);

      // Download the PDF
      if (pdfBlob) {
        this.downloadPDF(pdfBlob);
      }
      
    });
    
  }
  else{
    setTimeout(()=>{
        this.errorMessage="";
    },1000);
        this.errorMessage="Invalid Amount Or Insufficient Amount Error";
  }
  
  }
  
  
  isValidAmount(amount:number):boolean{
    return amount>0 && amount<1000000000;
  }

  isNotGreater(amount:number):boolean{
    const a=this.account.balance;
    return amount>a;
  }

  downloadPDF(pdfBlob: Blob): void {
    const link = document.createElement('a');
    const url = URL.createObjectURL(pdfBlob);
  
    link.href = url;
    link.download = 'withdraw_receipt.pdf';  // Filename for the downloaded PDF
    link.click();
  
    // Cleanup URL object after download
    URL.revokeObjectURL(url);
  }
}
