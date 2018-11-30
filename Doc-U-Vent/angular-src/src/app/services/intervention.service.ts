import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { DatabaseService } from './database.service';
@Injectable()
export class InterventionService {

  selectedIntervention: any;
  ngOnInit() {
  }

  ngOnDestroy() {
  }

  constructor(private databaseService: DatabaseService) {
  }

  submitIntervention(intervention: any) {
    return this.databaseService.submitIntervention(intervention);
  }

  updateIntervention(interventionId: string, intervention: any) {
    return this.databaseService.updateIntervention(interventionId, intervention);
  }

  getInterventionsByUserId(userId: string) {
    return this.databaseService.getInterventionsByUserId(userId);
  }

  getInterventionsByClinicalGroup() {
    return this.databaseService.getInterventionsByClinicalGroup();
  }

  setSelectedIntervention(intervention: any) {
    this.selectedIntervention = intervention;
  }

  getSelectedIntervention() {
    return this.selectedIntervention;
  }

  getInterventions() {
    return this.databaseService.getInterventions();
  }

}
