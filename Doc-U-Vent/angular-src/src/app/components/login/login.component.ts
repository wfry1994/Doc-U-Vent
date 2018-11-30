import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('messageModal') messageModal: ModalDirective;
  loading = false;
  emailAddress: string;
  password: string;
  error: string = undefined;
  recoveryEmail: string;
  recoveryError: string;
  message: string;
  messageIsShowing: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.loading = true;
    this.authService.doEmailLogin(this.emailAddress, this.password)
      .then((res => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }))
      .catch(error => {
        this.loading = false;
        this.error = error.message;
        console.log(this.error);
      });
  }

  sendEmail(){
    if(this.recoveryEmail !== undefined) {
      this.authService.resetPassword(this.recoveryEmail).then(() =>{
        this.messageIsShowing = true;
        this.message = "The email has been sent. Please check your email to reset your password.";

        setTimeout(() =>{
          this.hideModal();
          this.messageIsShowing = false;
        }, 3000);
      }).catch(err => {
        this.recoveryError = err;
      })
    }
  }

  showModal() {
    this.messageModal.show();
  }

  hideModal() {
    this.messageModal.hide();
  }

}
