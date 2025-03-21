import { Injectable } from "@angular/core";
import { NewTaskdata, Tasks } from "./task/task.model";

@Injectable( { providedIn :'root' })

export class TasksService {
// Mock task data to experience all functionalities of task pro app    
    private tasks : Tasks[] = [
        {
            id:"1",
            user_id:"u1", 
            task_name:"Add users to app", 
            task_desc:"In the task management app, users need to be added to dummy_users.ts file", 
            dueDate: '2025-02-31', 
            isCompleted:false,
        },
        {
            id:"2",
            user_id:"u2",
            task_name: "Write documentation",
            task_desc: "Write technical documentation for the new API endpoints.",
            dueDate: '2025-03-13',
            isCompleted:false,
        },
        {
            id:"3",
            user_id:"u1",
            task_name: "Design homepage",
            task_desc: "Create a wireframe and design for the homepage of the website.",
            dueDate: '2025-04-04',
            isCompleted:false,
        },
        {
            id:"4",
            user_id:"u3",
            task_name: "Set up database",
            task_desc: "Set up and configure the new database for the project.",
            dueDate: '2025-03-13',
            isCompleted:false,
        },
        {
            id:"5",
            user_id:"u4",
            task_name: "Bug fix login issue",
            task_desc: "Fix the issue with user login where the page throws an error.",
            dueDate: '2025-02-24',
            isCompleted:false,
        },
        {
            id:"6",
            user_id:"u5",
            task_name: "Update dependencies",
            task_desc: "Update project dependencies to their latest stable versions.",
            dueDate: '2025-03-10',
            isCompleted:false,
        },
        {
            id:"7",
            user_id:"u6",
            task_name: "Design homepage",
            task_desc: "Create a wireframe and design for the homepage of the website.",
            dueDate: '2025-04-04',
            isCompleted:false,
        },
    ];

// Retreiving data from session storage    
    constructor () {
        const tasks = sessionStorage.getItem('tasks');
        if(tasks){
            this.tasks = JSON.parse(tasks);
        }
    }

// Filtering tasks based on selected userID    
    getUserTasks(user_id : string) {
        return this.tasks.filter((task) => task.user_id === user_id);
    }

// Adding new task to user    
    addTask(taskData: NewTaskdata, user_id : string){
        this.tasks.unshift({
            id: new Date().getTime().toString(),
            user_id : user_id,
            task_name : taskData.task_name,
            task_desc : taskData.task_desc,
            dueDate : taskData.dueDate,
            isCompleted : false,
        });
        this.saveTask(); // Updating Session storage
    }

// Removing task when deleted    
    removeTask(task_id:string){
        this.tasks = this.tasks.filter ((task)=> task.id !== task_id)
        this.saveTask(); // Updating Session storage
    }

// Setting isCompleted flag for completed tasks    
    markTaskAsCompleted(task_id:string){
        const task = this.tasks.find(t => t.id === task_id);
        if (task) {
            task.isCompleted = true;
        }
        this.saveTask(); // Updating Session storage
    }

// Storing data to session storage    
    private saveTask(){
        sessionStorage.setItem('tasks',JSON.stringify(this.tasks));
    }
}