import { Component , EventEmitter, Input, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { type Tasks } from './task.model';
import { TasksService } from '../task.services';

@Component({
  selector: 'app-task',
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input({required : true}) task!: Tasks;
 
  private tasksService = inject(TasksService)

  complete_task() {
    this.tasksService.removeTask(this.task.id)
  }

}
