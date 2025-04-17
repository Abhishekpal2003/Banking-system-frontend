import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { HomeComponent } from './home/home.component';
import { GenerateAccComponent } from './generate-acc/generate-acc.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GenerateListComponent } from './generate-list/generate-list.component';

const routes: Routes = [
  {path:'accounts',component:AccountListComponent},
  {path:'create-account',component:CreateAccountComponent},
  {path:'deposit/:id',component:DepositComponent},
  {path:'withdraw/:id',component:WithdrawComponent},
  {path:'account-details/:id',component:AccountDetailsComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'generate',component:GenerateAccComponent},
  {path:'login',component:LoginComponent},
  // {path:'login/register/login',component:LoginComponent},
  // {path:'login/register',component:RegisterComponent}
  {path: 'register',component:RegisterComponent},
  {path: 'forbidden',component:ForbiddenComponent},
  {path: 'adminlist',component:GenerateListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
