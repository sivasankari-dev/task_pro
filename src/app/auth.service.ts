import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

// Dummy credentials for admin
  private adminCredentials = { username: 'admin', password: 'admin' };

  private LoginData =  {
    username : '',
    password: '',
    isLoggedIn: false,
    userRole: '',
  } 

// Retrieve user login data from session storage  
  constructor() {
    const storedLoginData = sessionStorage.getItem('LoginData');
    if (storedLoginData) {
      this.LoginData = JSON.parse(storedLoginData);
    }
   }

   loginAuth(username :string, password : string) : boolean {

    let isAuthenticated = false;
    let userRole = '';

    if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
        userRole = 'admin';
        isAuthenticated = true;
    } else if (['u1', 'u2', 'u3', 'u4', 'u5', 'u6'].includes(username) && password === username) {
        userRole = 'user';
        isAuthenticated = true;
    } 
    
    if (isAuthenticated) {
    this.LoginData = {
      username: username,
      password: password, // Not encrypted as it is a mock service 
      isLoggedIn: true,
      userRole: userRole
    };

// Store login data in session Storage      
      sessionStorage.setItem('LoginData',JSON.stringify(this.LoginData));  

    } else {
        alert('Invalid credentials');
    }
    return isAuthenticated; // Is returned back to task component for role based rendering 
  }

// To get login data stored after login
   getUser() : any {
      const storedLoginData = sessionStorage.getItem('LoginData');
      if (storedLoginData) {
        this.LoginData = JSON.parse(storedLoginData);
      }
      return this.LoginData;
   }

// To remove data in session storage   
   userLogout() :any {
      sessionStorage.removeItem('LoginData');
      sessionStorage.removeItem('tasks');
   }
}
