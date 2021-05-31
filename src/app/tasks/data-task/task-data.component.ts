import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from '../ITask';


@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TaskDataComponent implements OnInit {
  tasks: ITask[];
  errorMessage: string;
  _filter: string;
  get filter(): string {
    return this._filter;
  }
  set filter(value: string) {
    this._filter = value;
    this.filteredTasks = this.filter ? this.performFilter(this.filter) : this.tasks;
  }
  filteredTasks: ITask[];
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,  
  };
  public orderConfig = {
    selectOrder: 'Contact',
    descOrder: '',
  };

  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  
  descClicked(event) {
    if (event.target.checked){
      this.orderConfig.descOrder = this.orderConfig.selectOrder;
      this.orderConfig.selectOrder = "-"+this.orderConfig.selectOrder;
    } else {
      this.orderConfig.selectOrder = this.orderConfig.descOrder;
    }
    
  }
  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
    this.config.currentPage = number;
  }
  totalTasks: number;
  constructor(private taskService: TaskService) { 
  }
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
        this.totalTasks = this.tasks.length;
        setInterval(() => {
          this.isLoading = false; 
        }, 550);
        
    },
    error: err => this.errorMessage = err
    });
  }
  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe({
      next: (success) => {
        console.log(success)
      },
      error: (err) => {
        console.log(err);
      }

    })
  }
  time = {hour: 13, minute: 30};
  performFilter(filterBy: string): ITask[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter((task: ITask) => 
      task.Task.toLocaleLowerCase().indexOf(filterBy) !== -1 || task.Contact.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  public endCount(currentPage, itemsPerPage, totalTasks) {
    return Math.min((this.config.currentPage * this.config.itemsPerPage), this.totalTasks);
  }
}
