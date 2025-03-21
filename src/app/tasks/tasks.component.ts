import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './task.services';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-tasks',
  imports: [TaskComponent,NewTaskComponent,CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{

  @Input({ required:true }) name! : string;
  @Input({ required:true}) user_id! :string;

// Inject the task service and authservice through constructor
  constructor (private tasksService : TasksService,private authService : AuthService) {}

  isLoggedIn:boolean = false;
  userRole: string | null = '';
  isAddingTasks = false;
  selectedTab: string = 'open';

// Check if the user is already logged in by getting user data from authService 
  ngOnInit() {
    // const storedLoginData = localStorage.getItem('LoginData');
    // if (storedLoginData) {
    //   this.isLoggedIn = true;
    //   const loginData = JSON.parse(storedLoginData);
    //   this.userRole = loginData.userRole;
    // }
    const storedLoginData = this.authService.getUser();
    if (storedLoginData) {
      this.isLoggedIn = true;
      this.userRole = storedLoginData.userRole;
    }
  }

// Open tasks tab to be displayed when another user is selected
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user_id']) {
      this.selectedTab = 'open';
    }
  }

// getter method for tasks assigned to user based on user_id  - getUserTasks injected from task service
  get selectedUserTasks () {

    return this.tasksService.getUserTasks(this.user_id) || [];  // Fall back empty array in case of null or undefined
  }

// Filter user tasks for open tasks tab
  getOpenTasks(): any[] {
    return this.selectedUserTasks.filter(task => !task.isCompleted);
  }

// Filter user tasks for completed tasks tab
  getcompletedTasks(): any[] {
    return this.selectedUserTasks.filter(task => task.isCompleted);
  }

// Toggle between open and completed tasks on click
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

// Adding new task to selected user - injected from task service
  onStartAddTask() {
    this.isAddingTasks = true;
  }

// When clicking cancel button, add task modal has to be hidden  
  onTaskCancel() {
    this.isAddingTasks = false;
  }

}

