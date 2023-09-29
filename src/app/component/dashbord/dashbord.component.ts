import { Component,OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CurdService } from 'src/app/service/curd.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent  implements OnInit{

  taskObj:Task= new Task()
  taskArr:Task[]=[]
  addTaskValue:string='';
  editTaskValue:string='';

constructor(private crudService:CurdService ){}
ngOnInit(): void {
  this.editTaskValue=''
  this.addTaskValue=''
  this.taskObj= new Task()
  this.taskArr=[]
  this.getAllTasks()

}

addTask(){
  this.taskObj.tast_name=this.addTaskValue
  this.crudService.addTask(this.taskObj).subscribe((res)=>{
    this.getAllTasks()
    this.addTaskValue=''
  },err =>{
    alert(err)
  })
}
getAllTasks(){
  this.crudService.getAllTask().subscribe((res)=>{
      this.taskArr=res
  },err=>{
    alert(err)
  })
}
editTask() {
  this.taskObj.tast_name = this.editTaskValue;
  this.crudService.editTask(this.taskObj).subscribe(
    (res) => {
      this.getAllTasks()
    },
    (err) => {
      alert('Failure');
    }
  );
}
deleteTask(task: Task) {
  this.crudService.deleteTask(task).subscribe(
    (res) => {
      this.getAllTasks()
    }, err => {
      alert('Failed to delete');
    }
  );
}
call(task:Task){
  this.taskObj=task
  this.editTaskValue=task.tast_name
}
}
