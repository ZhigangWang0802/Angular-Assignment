import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  closeResult = '';
  task = {
    QuoteID: '',
    QuoteType: '',
    Contact: '',
    Task: '',
    Date: {
      year: '',
      month: '',
      day: ''
    },
    Time: {
      hour: '',
      minute: '',
      second: ''
    },
    DueDate: '',
    TaskType: ''
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
  submitCreateTask(form) {
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
    this.taskService.postTask(task).subscribe(
      data => {
        this.router.navigate(['/tasks/', data.QuoteID])
    },
    error=> {
      console.log(error)
    });
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

