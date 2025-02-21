// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   imports: [],
//   templateUrl: './user.component.html',
//   styleUrl: './user.component.css'
// })
// export class UserComponent {

// }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

type User ={
  id:string,
  name:string,
  avatar:string,
}

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports:[CommonModule],
})
export class UserComponent{
  // @Input({ required : true }) avatar!: string;
  // @Input({ required : true }) name!: string;
  // @Input({ required : true }) id!:string;
  @Input({ required:true }) user! : User;
  @Output () select = new EventEmitter();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onUserSelected() {
   this.select.emit(this.user.id);
  }

 }