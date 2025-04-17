import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  private roles: string[] = [];

  public setRoles(role: string) {
    this.roles = [role];
    localStorage.setItem('roles', JSON.stringify(this.roles));
  }

  public getRoles(): [] {
    const roles = localStorage.getItem("roles");
    return roles ? JSON.parse(roles) : [];
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    const token = localStorage.getItem('jwtToken');
    return token !== null ? token : '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

}
