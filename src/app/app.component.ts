import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, UserComponent, TasksComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{

  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  userRole: string = '';

// Inject authService to get login info for role based render  
  private authService = inject(AuthService);

// get login information   
  ngOnInit(){
      const storedLoginData = this.authService.getUser();
      if (storedLoginData.userRole) {
        this.isLoggedIn = true;
        this.userRole = storedLoginData.userRole;
      }
  }

  title = 'Task Management app';
  users = DUMMY_USERS;
  selectedUserId? : string;

// To capture the selected user based on the userID
  get selectedUser() {
    return this.users.find ((user)=>user.id === this.selectedUserId)
  }

// To get the selected user's userId on click
  onSelectUser(id:string){
    this.selectedUserId = id;
      // console.log (this.selectedUser)
  }

// Get login info for role based render of app component  
  get userLogin(){
    return this.users.find ((user)=>user.id === this.username);
  }

// To display corresponding user name in welcome message after login
  get loginName(){
    const login = this.users.find ((user)=>user.id === this.username);
    return login?.name;
  }

// login will use authservice to check credentials
  login() {
     this.isLoggedIn =  this.authService.loginAuth(this.username,this.password);
     this.userRole = this.authService.getUser().userRole;
  }

//  logout will clear local storge and selected user 
  logout(){
    this.authService.userLogout();
    this.selectedUserId = '';
    this.isLoggedIn = false;
    this.userRole = '';
    this.username='';
    this.password='';
  }
}
