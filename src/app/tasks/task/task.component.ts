import { Component , EventEmitter, Input, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { type Tasks } from './task.model';
import { TasksService } from '../task.services';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-task',
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{

  @Input({required : true}) task!: Tasks; // task data sent from tasks component for selected user
  isLoggedIn:boolean = false;
  userRole: string | null = '';

// Services injected for task component
  private tasksService = inject(TasksService);
  private authService = inject(AuthService);

// Check if the user is already logged in by looking for user data from auth service
  ngOnInit() {
    // const storedLoginData = localStorage.getItem('LoginData');
    // if (storedLoginData) {
    //   this.isLoggedIn = true;
    //   const loginData = JSON.parse(storedLoginData);
    //   this.userRole = loginData.userRole;
    // }
    // console.log('logindata',storedLoginData);

// getUser injected from auth service
    const storedLoginData = this.authService.getUser();
    if (storedLoginData) {
      this.isLoggedIn = true;
      this.userRole = storedLoginData.userRole;
    }
  }

// Remove task injected from task service - When delete button is clicked
  delete_task() {
    this.tasksService.removeTask(this.task.id)
  }

// markTaskAsCompleted injected from task service - when complete button is clicked
  complete_task() {
    this.tasksService.markTaskAsCompleted(this.task.id)
  }
}
