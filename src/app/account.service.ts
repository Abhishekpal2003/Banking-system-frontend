import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';
import { saveAs } from 'file-saver';
import { Generate } from './generate';
import { Register } from './register';
import { UserAuthService } from './user-auth.service';
import { Login } from './login';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl="http://localhost:9090/api/accounts";
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });


  constructor(private httpClient:HttpClient,private authService:UserAuthService) { }

  //To fetch account list
  getAllAccounts():Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseUrl}`);
  }

  //To fetch admin create Account list
  getAllAdminAccounts():Observable<Generate[]>{
    return this.httpClient.get<Generate[]>(`${this.baseUrl}/getAdminList`);
  }

  //To create account
  createAccount(account:Account):Observable<Account>{
    return this.httpClient.post<Account>(`${this.baseUrl}`,account);
  }

  //Generate Account number
  generateAccountNo(generate:Generate):Observable<Generate>{
    return this.httpClient.post<Generate>(`${this.baseUrl}/generate`,generate);
  }
  
  //Get Account by id
  getAccountById(id:number):Observable<Account>{
    return this.httpClient.get<Account>(`${this.baseUrl}/${id}`);
  }

  //Search
  searchByAcc(search:number):Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseUrl}/${search}/search`);
  }

  //Serach Admin
  searchByAccAdmin(search: number):Observable<Generate[]>{
    return this.httpClient.get<Generate[]>(`${this.baseUrl}/${search}/adminsearch`);
  }



  deposit(id: number, amount: number): Observable<HttpResponse<Blob>> {
    const request = { amount };

    return this.httpClient.put<Blob>(`${this.baseUrl}/${id}/deposit`, request, {
      observe: 'response',    // Observing the full response to get headers
      responseType: 'blob' as 'json' // Setting response type as 'blob'
    });
  }
  Withdraw(id: number, amount: number): Observable<HttpResponse<Blob>> {
    const request = { amount };

    return this.httpClient.put<Blob>(`${this.baseUrl}/${id}/withdraw`, request, {
      observe: 'response',    // Observing the full response to get headers
      responseType: 'blob' as 'json' // Setting response type as 'blob'
    });
  }

  

  delete(id:number):Observable<Account>{
    return this.httpClient.delete<Account>(`${this.baseUrl}/${id}`);
  }

  //Export to exxcel account list
  exportData(data: any[]): void {
    this.httpClient.post(`${this.baseUrl}/export`, data, { responseType: 'blob' }).subscribe((response: Blob) => {
      saveAs(response, 'data.xlsx');
    });
  }

  //Export to excel account list Admin
  exportDataAdmin(data: any[]): void {
    this.httpClient.post(`${this.baseUrl}/adminexport`, data, { responseType: 'blob' }).subscribe((response: Blob) => {
      saveAs(response, 'dataAdmin.xlsx');
    });
  }

  //register
  
  register(register: Register): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/register`, register, { responseType: 'text' as 'json' });
  }
  
  public login(login:Login) {
    return this.httpClient.post<string>(`${this.baseUrl}/authentication`, login,{
      headers: this.requestHeader
    });
  }


  roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.authService.getRoles();
    
    if (userRoles != null && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          
          if (userRoles[i] === allowedRoles[j]) {
            
            isMatch = true;
            return isMatch; // Return immediately when a match is found
          }
        }
      }
    }
    return isMatch; // Return after completing all checks
  }
  

  
}
