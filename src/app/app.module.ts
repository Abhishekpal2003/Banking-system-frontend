import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountListComponent } from './account-list/account-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FormsModule } from '@angular/forms';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { HomeComponent } from './home/home.component';
import { GenerateAccComponent } from './generate-acc/generate-acc.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AccountService } from './account.service';
import { AuthGuard } from './auth/auth.guard';
import { GenerateListComponent } from './generate-list/generate-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    CreateAccountComponent,
    DepositComponent,
    WithdrawComponent,
    AccountDetailsComponent,
    HomeComponent,
    GenerateAccComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ForbiddenComponent,
    GenerateListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
