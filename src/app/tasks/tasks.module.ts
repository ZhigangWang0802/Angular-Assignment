
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { TaskDetailGuard } from '../services/task-detail.guard';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskDataComponent } from './data-task/task-data.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { DetailedTaskComponent } from './detailed-task/detailed-task.component';
import { TaskDetailsComponent } from './task-details.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';


const routes: Routes = [
  { path: 'tasks',  component: TaskDetailsComponent },
  { path: 'tasks/:id', canActivate: [TaskDetailGuard], component: DetailedTaskComponent },
]

@NgModule({
  declarations: [
    TaskDetailsComponent,
    AddTaskComponent,
    TaskDataComponent,
    DeleteTaskComponent,
    UpdateTaskComponent,
    ViewTaskComponent,
    DetailedTaskComponent,
  ],
  imports: [
    FormsModule,
    NgxPaginationModule,
    NgPipesModule,
    NgbModule,
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class TasksModule { }
