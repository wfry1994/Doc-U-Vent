import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-assign-groups',
  templateUrl: './assign-groups.component.html',
  styleUrls: ['./assign-groups.component.scss']
})
export class AssignGroupsComponent implements OnInit {
  @ViewChild('messageModal') messageModal: ModalDirective;

  users: Array<any>;
  userSub: Subscription;
  groupSub: Subscription;
  usersToUpdate: Array<any> = [];
  message: string = "The User's clincal groups have successfully been updated.";
  modalTitle: string = "Success";
  clinicalGroups: Array<any>;

  constructor(private auth: AuthService, private router: Router, private db: DatabaseService) { }

  ngOnInit() {
    if (!this.auth.userIsAdmin() && !this.auth.userIsFaculty()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.userSub = this.db.getUsers().subscribe(users => {
      this.users = users;
    });

    this.groupSub = this.db.getClinicalGroups().subscribe(groups => {
      this.clinicalGroups = groups;
    });

  }

  ngOnDestroy() {
    if (this.userSub !== undefined) {
      this.userSub.unsubscribe();
    }

    if(this.groupSub !== undefined) {
      this.groupSub.unsubscribe();
    }
  }

  updateClinicalGroups() {
    let userId = "";

    this.users.forEach((user) => {
      userId = user.key;
      delete user['key'];
      this.db.updateUser(userId, user).catch(err => {
        console.log(err)
        this.message = 'There was a problem updating one or more user\'s clinical groups.';
        this.modalTitle = "Uh Oh!";
      });
    });
    
    this.showModal();
  }

  updateUsersClinicalGroup(index, newGroup) {
    this.users[index].clinicalGroup = newGroup;
  }

  showModal() {
    this.messageModal.show();
  }

  hideModal() {
    this.messageModal.hide();
    this.redirect();
  }

  redirect() {
    this.router.navigate(['/dashboard']);
  }

}
