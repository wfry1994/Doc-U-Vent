import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Intervention } from '../../models/intervention.model';
import { InterventionService } from '../../services/intervention.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthService } from '../../services/auth-service.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  @ViewChild('messageModal') messageModal: ModalDirective;
  interventionModel: Intervention;
  message: String = "";
  modalTitle: String = "";
  updatingIntervention: boolean = false;
  editableIntervention: any;
  editableInterventionKey: any;
  userSub: Subscription;
  userSubmittedIntervention: boolean = false;

  constructor(private interventionService: InterventionService, private router: Router, private storage: LocalStorageService, private db: DatabaseService) {
    this.editableIntervention = this.interventionService.getSelectedIntervention();
    this.interventionService.setSelectedIntervention(undefined);
    if (this.editableIntervention !== undefined) {
      this.interventionModel = new Intervention(this.editableIntervention);
      this.editableInterventionKey = this.editableIntervention.key;
      this.removeFormatting();
      this.updatingIntervention = true;
    } else {
      this.interventionModel = new Intervention(this.interventionModel);
    }

  }

  ngOnInit() {
    this.userSub = this.db.getUserByEmail().valueChanges().subscribe(user => {
      this.storage.setUser(user);
      this.userSub.unsubscribe();
    }, err => {
      console.log(err);
    });  }

  submitIntervention() {
    this.formatFields();
    if (this.updatingIntervention) {
      delete this.interventionModel['key'];
      this.interventionService.updateIntervention(this.editableInterventionKey, this.interventionModel).then(res => {
        this.message = "The Intervention has successfully been updated.";
        this.modalTitle = "Success";
        this.showModal();
      }, (err) => {
        this.message = "There was an error updating the Intervention.";
        this.modalTitle = "Uh Oh!";
        this.showModal();
        console.log(err);
      });
    } else {
      this.interventionModel.clinicalGroup = this.storage.getUserClinicalGroup();
      this.timestampIntervention();
      this.interventionModel.user_id = this.storage.getUserId();
      this.interventionService.submitIntervention(this.interventionModel)
        .then(res => {
          this.message = "The intervention has successfully been created.";
          this.modalTitle = "Success";
          this.showModal();
        }, (err) => {
          this.message = "There was an error creating the Intervention.";
          this.modalTitle = "Uh Oh!";
          this.showModal();
          console.log(err);
        });
    }
  }

  atLeastOneChecked(checkBoxGroup: string) {
    switch (checkBoxGroup) {
      case 'outcome':
        return this.interventionModel.expectedOutcomesAreValid();
      case 'interventionType':
        return this.interventionModel.typeOfInterventionIsValid();
      case 'modeOfRecommendation':
        return this.interventionModel.modeOfRecommendationIsValid();
      case 'intervention':
        return this.interventionModel.interventionIsValid();
    }

  }

  showModal() {
    this.messageModal.show();
  }

  hideModal() {
    this.messageModal.hide();
    this.redirect();
  }

  formatFields() {
    for (let key in this.interventionModel) {
      if (this.interventionModel[key] === "") {
        this.interventionModel[key] = "-";
      }
    }
  }

  removeFormatting() {
    for (let key in this.interventionModel) {
      if (this.interventionModel[key] === "-") {
        this.interventionModel[key] = "";
      }
    }
  }

  redirect() {
    if (this.updatingIntervention) {
      this.router.navigate(['/intervention-grid']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  timestampIntervention(): void {
    this.interventionModel.timestamp = Date.now();
  }

  updateSubmissionStatus () : void {
    this.userSubmittedIntervention = true;
  }

}
