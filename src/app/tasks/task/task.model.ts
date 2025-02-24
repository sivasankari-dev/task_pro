export interface Tasks {
    id:string;
    user_id:string;
    task_name:string;
    task_desc:string;
    dueDate:string;
}

export interface NewTaskdata {
    task_name:string;
    task_desc:string;
    dueDate:string;
}