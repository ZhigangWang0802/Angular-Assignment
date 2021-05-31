import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  closeResult = '';
  @Input()
  currentID: number;
  @Input()
  task: any = {
    QuoteID: '',
    QuoteType: '',
    Contact: '',
    Task: '',
    DueDate: '',
    TaskType: '',
    Date: {
      year: '',
      month: '',
      day: ''
    },
    Time: {
      hour: '',
      minute: '',
      second: '',
    },
  }
  submitUpdateTask() {
    var dateTime = new Date(this.task.DueDate);
    if (this.task.Date == null) {
      this.task.Date = {year: dateTime.getFullYear(), month: dateTime.getMonth(), day: dateTime.getMonth()};
    }
    if (this.task.Time == null) {
      this.task.Time = {hour: dateTime.getHours(), minute: dateTime.getMinutes(), second: dateTime.getSeconds()};
    }
    const task = {
      QuoteID: this.task.QuoteID,
      QuoteType: this.task.QuoteType,
      Contact: this.task.Contact,
      Task: this.task.Task,
      Date: this.task.Date,
      Time: this.task.Time,
      DueDate: `${this.task.Date.year}-${this.addZeros(this.task.Date.month)}-${this.addZeros(this.task.Date.day)}T${this.addZeros(this.task.Time.hour)}:${this.addZeros(this.task.Time.minute)}:${this.addZeros(this.task.Time.second)}`,
      TaskType: this.task.TaskType,
    }
    this.taskService.putTask(this.currentID, task).subscribe(
      data => {
        this.router.navigate(['/tasks/', task.QuoteID])
    },
    error=> {
      console.log(error)
    });
  }
  constructor(private modalService: NgbModal, private taskService: TaskService, private router: Router) {}
  
  ngOnInit(): void {
    
  }
  public addZeros(num) {
    if (num < 10) {
      return '0'+ num;
    }
    else {
      return num;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
