import { Component, Input } from '@angular/core';
import { DUMMY_TASKS } from '../dummy-tasks';
//import { type Tasks } from './task/task.model';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskdata } from './task/task.model';


@Component({
  selector: 'app-tasks',
  imports: [TaskComponent,NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  @Input({ required:true }) name! : string;
  @Input({ required:true}) id! :string;

  tasks = DUMMY_TASKS;

  isAddingTasks = false;

  get selectedUserTasks () {

    return this.tasks.filter((task) => task.user_id === this.id)
  }

  onComplete (id:string){
    this.tasks = this.tasks.filter((task) => task.id != id)
  }

  onStartAddTask() {
    this.isAddingTasks = true;
  }

  onTaskCancel() {
    this.isAddingTasks = false;
  }

  onAddtask(newtask:NewTaskdata){
    this.tasks.unshift({
      id : new Date().getTime().toString(),
      user_id : this.id,
      task_name : newtask.task_name,
      task_desc : newtask.task_desc,
      dueDate:newtask.dueDate
    });
    this.isAddingTasks = false;
  }

}

