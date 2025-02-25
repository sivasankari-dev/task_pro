import { Component, Output,EventEmitter } from '@angular/core';
import { type NewTaskdata } from '../task/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule,CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTaskdata>();

  task_input_name = '';
  task_input_desc = '';
  task_input_date = '';


  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    console.log('Form submitted!');
    this.add.emit(
      {task_name:this.task_input_name,
       task_desc:this.task_input_desc,
       dueDate:this.task_input_date,
      }
    );
  }
}
