import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})
export class DeleteUsersComponent implements OnInit {
  @ViewChild('messageModal') messageModal: ModalDirective;
  userSub: Subscription;
  users: Array<any> = [];
  currentUserId: string;
  message: string = "The user and all of their data are about to be deleted. Do you wish to continue?";
  modalTitle: string = "Caution";
  userToDelete: any;
  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router, private db: DatabaseService, private storage: LocalStorageService) {
    this.currentUserId = this.storage.getUserId();
  }

  ngOnInit() {
    if (!this.auth.userIsAdmin()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.userSub = this.db.getUsers().subscribe(users => {
      this.users = this.db.filterNotEqualTo(users, "userId", this.currentUserId);
    });
  }

  ngOnDestroy() {
    if (this.userSub !== undefined) {
      this.userSub.unsubscribe();
    }
  }

  setUserToDelete(index) {
    this.userToDelete = this.users[index];
  }

  async deleteUser() {
    this.loading = true;
    await this.db.removeUser(this.userToDelete.userId);
    await this.deleteUserInterventions(this.userToDelete.userId);
    await this.db.removeUserRole(this.userToDelete.userId);
    this.loading = false;
  }

  showModal() {
    this.messageModal.show();
  }

  hideModal() {
    this.messageModal.hide();
  }

  deleteUserInterventions(userId: string) {
    let interventionSub = this.db.getInterventionsByUserId(userId).subscribe(interventions => {
      interventionSub.unsubscribe();

      interventions.forEach((intervention) => {
        this.db.removeIntervention(intervention.key);
      });

    });
  }

}
