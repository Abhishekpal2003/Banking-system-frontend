import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  message: string | null = null;  // Allow `message` to be `null`
  pdfFile: Blob | null = null;
  id:number=0;
  account:Account=new Account();
  balance1:number=0;
  constructor(private accountService:AccountService,private rout:ActivatedRoute,private router:Router){}

  ngOnInit(){
    this.id=this.rout.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data=>{
      this.account=data;
    })
  }

  isValidAmount(amount:number):boolean{
    return amount>0;
  }

  succesMessage="";
  errorMessage="";


onSubmit() {
  if (this.isValidAmount(this.balance1)) {
    this.account.balance = this.balance1;

    this.accountService.deposit(this.id, this.account.balance).subscribe(response => {
      // Handle the PDF Blob (which is in the response body)
      const pdfBlob = response.body;

      // Handle headers (message and entity)
      this.message = response.headers.get('message');
      const accountJson = response.headers.get('entity');
      
      if (accountJson) {
        this.account = JSON.parse(accountJson);  // Parse JSON string back to object
      }

      if (this.message === 'Successfully done') {
        this.succesMessage = 'Deposit SuccessFully..!';
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
  } else {
    this.errorMessage = 'Invalid Amount... Please enter valid amount';
    setTimeout(() => {
      this.errorMessage = '';
    }, 1000);
  }
}

downloadPDF(pdfBlob: Blob): void {
  const link = document.createElement('a');
  const url = URL.createObjectURL(pdfBlob);

  link.href = url;
  link.download = 'deposit_receipt.pdf';  // Filename for the downloaded PDF
  link.click();

  // Cleanup URL object after download
  URL.revokeObjectURL(url);
}

}
