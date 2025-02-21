import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, UserComponent, TasksComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  
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


}
