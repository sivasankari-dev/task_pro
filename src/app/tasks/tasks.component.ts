import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './task.services';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tasks',
  imports: [TaskComponent,NewTaskComponent,CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  @Input({ required:true }) name! : string;
  @Input({ required:true}) user_id! :string;

  // tasks = DUMMY_TASKS;

  constructor (private tasksService : TasksService) {

  }

  isLoggedIn:boolean = false;
  userRole: string | null = '';
  isAddingTasks = false;
  selectedTab: string = 'open';

  ngOnInit() {
    // Check if the user is already logged in by looking at localStorage
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole) {
      this.isLoggedIn = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user_id']) {
      this.selectedTab = 'open';
    }
  }

  get selectedUserTasks () {

    return this.tasksService.getUserTasks(this.user_id) || [];
  }

  getOpenTasks(): any[] {
    return this.selectedUserTasks.filter(task => !task.isCompleted);
  }

  getcompletedTasks(): any[] {
    return this.selectedUserTasks.filter(task => task.isCompleted);
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  onStartAddTask() {
    this.isAddingTasks = true;
  }

  onTaskCancel() {
    this.isAddingTasks = false;
  }

}

