import { Component, Input } from '@angular/core';
import { DUMMY_TASKS } from '../dummy-tasks';
//import { type Tasks } from './task/task.model';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskdata } from './task/task.model';
import { TasksService } from './task.services';


@Component({
  selector: 'app-tasks',
  imports: [TaskComponent,NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  @Input({ required:true }) name! : string;
  @Input({ required:true}) user_id! :string;

  // tasks = DUMMY_TASKS;

  constructor (private tasksService : TasksService) {

  }

  isAddingTasks = false;

  get selectedUserTasks () {

    return this.tasksService.getUserTasks(this.user_id) || [];
  }

  onStartAddTask() {
    this.isAddingTasks = true;
  }

  onTaskCancel() {
    this.isAddingTasks = false;
  }

}

