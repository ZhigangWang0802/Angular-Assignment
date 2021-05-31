import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from '../ITask';

@Component({
  selector: 'app-detailed-task',
  templateUrl: './detailed-task.component.html',
  styleUrls: ['./detailed-task.component.css']
})
export class DetailedTaskComponent implements OnInit, OnDestroy {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }
  task: ITask[];
  sub: Subscription;
  id: number;
  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    })
    this.taskService.getTask(this.id).subscribe(
      (task) => {
        this.task = task;
      }
    )
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onBack() {
    this.router.navigate(['/tasks'])
  }
}
