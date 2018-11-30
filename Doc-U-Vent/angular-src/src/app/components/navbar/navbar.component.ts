import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service.service';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('messageModal') messageModal: ModalDirective;
  message: string = "The reset email has been sent. Please check your email to reset your password. If you don't see the email, check your spam folder.";
  ngOnInit(): void {
  }
  constructor(private auth:AuthService, private storage: LocalStorageService) { }

  isUserLoggedIn(): boolean {
    return this.auth.isUserLoggedIn();
  }

  logout(){
    this.auth.logout();
  }

  userIsAdmin() {
    return (this.auth.isUserLoggedIn() && this.auth.userIsAdmin());
  }

  userIsFaculty(){
    return (this.auth.isUserLoggedIn() && this.auth.userIsFaculty());
  }

  changePassword() {
    this.auth.resetPassword(this.storage.getUserEmail());
  }

  showModal() {
    this.messageModal.show();
  }

  hideModal() {
    this.messageModal.hide();
  }

}
