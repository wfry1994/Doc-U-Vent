import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Subscription } from 'rxjs';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
  selector: 'app-create-schools',
  templateUrl: './create-schools.component.html',
  styleUrls: ['./create-schools.component.scss']
})
export class CreateSchoolsComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private db: DatabaseService) { }
  UniversitySub: Subscription;
  universities: Array<any> = [];
  currentUniversities: Array<any> = [];
  newUniversity = {name: ""};
  universityToDelete: any;
  message = "The universities have successfully been updated.";
  modalTitle = "Success";
  warningMessageIsShowing: boolean = false;
  loading: boolean = false;
  @ViewChild('messageModal') messageModal: ModalDirective;

  ngOnInit() {
    if (!this.auth.userIsAdmin()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.UniversitySub = this.db.getUniversities().subscribe(schools => {
      this.universities = schools;
      this.currentUniversities = JSON.parse(JSON.stringify(schools));
    });
  }

  createUniversity() {
    if (this.newUniversity.name === "") {
      return;
    }

    this.db.createUniversity(this.newUniversity);
    this.newUniversity = {
      name: ""
    };
  }

  async deleteUniversity() {
    this.loading = true;
    await this.db.deleteUniversity(this.universityToDelete.key);
    // do more stuff....
    this.loading = false;
    this.hideModal();
  }

  setUniversityToDelete(index: number): void {
    this.universityToDelete = this.universities[index];
  }

  updateUniversities() {

  }

  showModal(warningFlag) {
    if (warningFlag) {
      this.message = "The University and all the information that belong to it are about to be deleted. Do you wish to continue?"
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

  resetModal() {
    this.message = "The Universities have successfully been updated.";
    this.modalTitle = "Success";
    this.warningMessageIsShowing = false;
  }

}
