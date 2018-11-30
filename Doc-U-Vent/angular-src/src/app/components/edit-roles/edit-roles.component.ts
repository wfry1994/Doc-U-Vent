import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent implements OnInit {

  @ViewChild('messageModal') messageModal: ModalDirective;
  users: Array<any>;
  userSub: Subscription;
  userRoleSub: Subscription;
  message: string = "The User's roles have successfully been updated.";
  modalTitle: string = "Success";
  userRoles: Array<any>;
  currentUserEmail : string;

  constructor(private auth: AuthService, private router: Router, private db: DatabaseService, private storage: LocalStorageService)
  {
    this.currentUserEmail = this.storage.getUserEmail();
  }

  ngOnInit() {
    if (!this.auth.userIsAdmin()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.userRoleSub = this.db.getUserRoles().subscribe(roles => {
      this.userRoles = roles;
      this.userRoleSub.unsubscribe();
      this.userSub = this.db.getUsers().subscribe(users => {
        this.users = this.removeCurrentUser(users);
        this.setUserRoles();
        this.userSub.unsubscribe();
      });
    })


  }

  ngOnDestroy() {
  }

  updateRoles() {
    let userId = "";
    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].role !== undefined) {
        userId = this.users[i].key;
        delete this.users[i]['key'];
        this.db.updateUserRole(userId, this.users[i].role).catch(err => {
          console.log(err);
          this.message = 'There was a problem updating one or more user\'s roles.';
          this.modalTitle = "Uh Oh!";
        });
      }
    }

    this.showModal();
  }

  updateUsersRole(index, newRole) {
    this.users[index].role = newRole;
  }

  redirect() {
    this.router.navigate(['/dashboard']);
  }

  showModal() {
    this.messageModal.show();
  }

  hideModal() {
    this.messageModal.hide();
    this.redirect();
  }

  setUserRoles() {
    var roleIndex;
    for (var i = 0; i < this.users.length; i++) {
      roleIndex = this.getRoleIndex(i);
      if (roleIndex >= 0) {
        this.users[i]['role'] = this.userRoles[roleIndex]['role'];
      }
    }
  }

  getRoleIndex(userIndex: number): number {
    for (var i = 0; i < this.userRoles.length; i++) {
      if (this.users[userIndex]['key'] === this.userRoles[i]['key']) {
        return i;
      }
    }
    return -1;
  }

  removeCurrentUser(users: Array<any>): Array<any> {
    var newUsers: Array<any> = users;
    for(let i =0; i < newUsers.length; i ++) {
      if(newUsers[i].email === this.currentUserEmail) {
        newUsers.splice(i,1);
      }
    }
    return newUsers;
  }

}
