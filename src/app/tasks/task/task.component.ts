import { Component , Input } from '@angular/core';
import { Tasks } from '../../dummy-tasks';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input({required : true}) task!: Tasks;

}
