import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, UserComponent, TasksComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{

  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  userRole: string | null = '';

   // Dummy credentials for admin (can be replaced with actual authentication logic)
   private adminCredentials = { username: 'admin', password: 'admin' };

   ngOnInit() {
    // Check if the user is already logged in by looking at localStorage
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole) {
      this.isLoggedIn = true;
    }
  }
  
  title = 'Task Management app';
  users = DUMMY_USERS;
  selectedUserId? : string;

  get selectedUser() {
    return this.users.find ((user)=>user.id === this.selectedUserId)
  }

  onSelectUser(id:string){
    this.selectedUserId = id;
      // console.log (this.selectedUser)
  }

  login() {
    // Handle login logic here
    if (this.username === this.adminCredentials.username && this.password === this.adminCredentials.password) {
      localStorage.setItem('userRole', 'admin');
      this.userRole = 'admin';
      this.isLoggedIn = true;
    } else if (this.username && this.password) {
      localStorage.setItem('userRole', this.username);
      this.userRole = 'user';
      this.isLoggedIn = true;
    } else {
      alert('Invalid credentials');
    }
    
  }

  logout(){
    // Handle logout logic and clear localStorage
    localStorage.removeItem('userRole');
    this.isLoggedIn = false;
    this.userRole = null;
    this.username='';
    this.password='';
  }

}
