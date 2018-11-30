import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { ModalDirective } from 'angular-bootstrap-md';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-clinical-groups',
  templateUrl: './clinical-groups.component.html',
  styleUrls: ['./clinical-groups.component.scss']
})
export class ClinicalGroupsComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private db: DatabaseService, private storage: LocalStorageService) { }
  clinicalGroups: Array<any> = [];
  currentClinicalGroups: Array<any> = [];
  interventions: Array<any> = [];
  users: Array<any> = [];
  newGroup = {name: ""};
  clinicalGroupSub: Subscription;
  message = "The clinical groups have successfully been updated.";
  modalTitle = "Success";
  warningMessageIsShowing: boolean = false;
  clinicalGroupToDelete: any;
  interventionSub: Subscription;
  userSub: Subscription;
  loading: boolean = false;

  @ViewChild('messageModal') messageModal: ModalDirective;

  ngOnInit() {
    if (!this.auth.userIsAdmin() && !this.auth.userIsFaculty()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.interventionSub = this.db.getInterventions().subscribe(interventions => {
      this.interventions = interventions;
    });

    this.clinicalGroupSub = this.db.getClinicalGroups().subscribe(groups => {
      this.clinicalGroups = groups;
      this.currentClinicalGroups = JSON.parse(JSON.stringify(groups));
    });

    this.userSub = this.db.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy() {
    if (this.clinicalGroupSub !== undefined) {
      this.clinicalGroupSub.unsubscribe();
    }

    if(this.interventionSub !== undefined) {
      this.interventionSub.unsubscribe();
    }

    if(this.userSub !== undefined) {
      this.userSub.unsubscribe();
    }
  }

  createClinicalGroup() {
    if (this.newGroup.name === "") {
      return;
    }

    this.db.createClinicalGroup(this.newGroup);
    this.newGroup = {
      name: ""
    };
  }

  updateClinicalGroups() {
    this.resetModal();
    for (var i = 0; i < this.clinicalGroups.length; i++) {
      let groupId = this.clinicalGroups[i].key;
      delete this.clinicalGroups[i]['key'];

      if (this.clinicalGroups[i].name !== this.currentClinicalGroups[i].name) {
        this.db.updateClinicalGroup(groupId, this.clinicalGroups[i]).catch(err => {
          console.log(err);
          this.message = 'There was a problem updating one or more clinical groups.';
          this.modalTitle = "Uh Oh!";
        });

        this.updateInterventions(i);
        this.updateUsersClinicalGroup(i);
      }

    }

    this.showModal(false);
  }

  showModal(warningFlag) {
    if (warningFlag) {
      this.message = "The clincal group and all the interventions that belong to it are about to be deleted. Do you wish to continue?"
      this.modalTitle = "Caution";
      this.warningMessageIsShowing = true;
    }
    this.messageModal.show();
  }

  hideModal() {
    this.messageModal.hide();

    if (!this.warningMessageIsShowing) {
      this.router.navigate(['/dashboard']);
    }
  }

  setClinicalGroupToDelete(index: number): void {
    this.clinicalGroupToDelete = this.clinicalGroups[index];
  }

  resetModal() {
    this.message = "The clinical groups have successfully been updated.";
    this.modalTitle = "Success";
    this.warningMessageIsShowing = false;
  }

  updateInterventions(currentIndex: number) {
    this.interventions.forEach((intervention) => {
      let interventionKey = intervention.key;
      delete intervention['key'];
      if (this.currentClinicalGroups[currentIndex].name === intervention.clinicalGroup) {
        intervention.clinicalGroup = this.clinicalGroups[currentIndex].name;
        this.db.updateIntervention(interventionKey, intervention);
      }
    });
  }

  updateUsersClinicalGroup(currentIndex: number) {
    this.users.forEach((user) => {
      let userKey = user.key;
      delete user['key'];
      if (user.clinicalGroup === this.currentClinicalGroups[currentIndex].name) {
        user.clinicalGroup = this.clinicalGroups[currentIndex].name;
        this.db.updateUser(userKey, user);
      }
    });
  }

  async deleteClinicalGroup() {
    this.loading = true;
    await this.db.deleteClinicalGroup(this.clinicalGroupToDelete.key);
    await this.deleteInterventions();
    await this.deleteUsersClinicalGroup();
    this.loading = false;
    this.hideModal();
  }

  deleteInterventions() {
    this.interventions.forEach((intervention) => {
      if (this.clinicalGroupToDelete.name === intervention.clinicalGroup) {
        this.db.removeIntervention(intervention.key);
      }
    });
  }

  deleteUsersClinicalGroup() {
    this.users.forEach((user) => {
      if(user.clinicalGroup === this.clinicalGroupToDelete.name) {
        delete user['clinicalGroup'];
        this.db.setUser(user.key,user);
      }
    });
  }

}
