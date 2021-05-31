import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  closeResult = '';
  constructor(private modalService: NgbModal, private authService: AuthService, private tokenService: TokenService) { }
  register = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  passwordValidator() {
    if (this.register.confirmPassword !== this.register.password) {
      return true;
    }
    else {
      return false;
    }
  }
  ngOnInit(): void {
  }
  @Output() successChanged: EventEmitter<any> = new EventEmitter<any>();
  submitRegister(){
    this.authService.register(this.register).subscribe(
      (user) => {
        console.log(user);
        this.isSuccessful = true;
        this.isSignUpFailed = false;        
      },
      (err) => {
        this.errorMessage = JSON.stringify(err.error.ModelState);
        this.isSignUpFailed = true;
      }
    )
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: ''}).result.then((result) => {
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
