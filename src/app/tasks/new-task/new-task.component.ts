import { Component, Input, Output,EventEmitter, inject } from '@angular/core';
import { type NewTaskdata } from '../task/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksService } from '../task.services';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule,CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Input({required:true}) user_id !: string;
  @Output() close = new EventEmitter<void>();
  

  task_input_name = '';
  task_input_desc = '';
  task_input_date = '';

  private tasksService = inject(TasksService)


  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask(
      {task_name:this.task_input_name,
       task_desc:this.task_input_desc,
       dueDate:this.task_input_date,
      },this.user_id,
    );
    this.close.emit();
  }
}
