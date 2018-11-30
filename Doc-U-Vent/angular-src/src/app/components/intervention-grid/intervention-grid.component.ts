import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../services/intervention.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-intervention-grid',
  templateUrl: './intervention-grid.component.html',
  styleUrls: ['./intervention-grid.component.css']
})
export class InterventionGridComponent implements OnInit {

  private gridApi;
  private selectedIntervention: any;
  interventionSubscription: Subscription;
  fileName: string = "Report";
  interventionIsSelected: boolean = false;
  rowData: any;
  oneWeekAgo: any;

  //Create the correct headers
  columnDefs = [
    { headerName: 'Intervention ID', field: '_id', cellClass: 'text-center', hide: true },
    { headerName: 'Intervention Date', field: 'date', cellClass: 'text-center' },
    { headerName: 'Name', field: 'pharmacistName', cellClass: 'text-center' },
    { headerName: 'practice Site', field: 'practiceSite', cellClass: 'text-center' },

    //intervention types
    { headerName: 'Drug Information Intervention', field: 'DrugInformation', cellClass: 'text-center' },
    { headerName: 'Pharmacokinetics Intervention', field: 'Pharmacokinetics', cellClass: 'text-center' },
    { headerName: 'Patient Education Intervention', field: 'PatientEducation', cellClass: 'text-center' },
    { headerName: 'Other Type of Intervention', field: 'otherTypeOfIntervention', cellClass: 'text-center' },

    //intervention
    { headerName: 'ADR Identified', field: 'adrIdentified', cellClass: 'text-center' },
    { headerName: 'Discontinuation of Drug Therapy', field: 'discontinuationOfDrugTherapy', cellClass: 'text-center' },
    { headerName: 'Dose Adjustment', field: 'doseAdjustment', cellClass: 'text-center' },
    { headerName: 'Dose Calculation', field: 'doseCalculation', cellClass: 'text-center' },
    { headerName: 'Drug Information Provided', field: 'drugInformationProvided', cellClass: 'text-center' },
    { headerName: 'Medication Reconciliation', field: 'medicationReconciliation', cellClass: 'text-center' },
    { headerName: 'Monitoring Recommendations', field: 'monitoringRecommendations', cellClass: 'text-center' },
    { headerName: 'New Drug Therapy Added', field: 'newDrugTherapyAdded', cellClass: 'text-center' },
    { headerName: 'Non-Pharmacological Recommendation', field: 'nonPharmacologicalRecommendation', cellClass: 'text-center' },
    { headerName: 'Drug Interaction Identified', field: 'drugInteractionIdentified', cellClass: 'text-center' },
    { headerName: 'Duplicate Therapy Identified', field: 'duplicateTherapyIdentified', cellClass: 'text-center' },
    { headerName: 'Immunization Administered', field: 'immunizationAdministered', cellClass: 'text-center' },
    { headerName: 'Disease State Education', field: 'diseaseStateEducation', cellClass: 'text-center' },
    { headerName: 'New Medication Education', field: 'newMedicationEducation', cellClass: 'text-center' },
    { headerName: 'Point of Care A', field: 'pointOfCareA', cellClass: 'text-center' },
    { headerName: 'Point of Care Lipids', field: 'pointOfCareLipids', cellClass: 'text-center' },
    { headerName: 'Point of Care Blood Glucose', field: 'pointOfCareBloodGlucose', cellClass: 'text-center' },
    { headerName: 'Point of Care Albumin', field: 'pointOfCareAlbumin', cellClass: 'text-center' },
    { headerName: 'Blood Pressure Screening', field: 'bloodPressureScreening', cellClass: 'text-center' },
    { headerName: 'Other Intervention', field: 'otherIntervention', cellClass: 'text-center' },

    //pharmacists recommendation
    { headerName: 'Pharmacist Recommendation', field: 'recommendation', cellClass: 'text-center' },
    { headerName: 'Recommendation Acceptance', field: 'recommendationAcceptance', cellClass: 'text-center' },
    { headerName: 'Modified Then Accepted', field: 'modifiedThenAccepted', cellClass: 'text-center' },

    //modes of recommendation
    { headerName: 'Recommendation Made By Phone', field: 'phone', cellClass: 'text-center' },
    { headerName: 'Recommendation Made To Provider', field: 'provider', cellClass: 'text-center' },
    { headerName: 'Recommendation Made To Patient', field: 'patient', cellClass: 'text-center' },
    { headerName: 'Written Recommendation', field: 'written', cellClass: 'text-center' },
    { headerName: 'Other Mode of Recommendation', field: 'otherModeOfRecommendation', cellClass: 'text-center' },

    { headerName: 'Encounter Length', field: 'encounterLength', cellClass: 'text-center' },

    //expected outcomes
    { headerName: 'Clinical Significance', field: 'clinicalSig', cellClass: 'text-center' },
    { headerName: 'ADR-Outcome', field: 'ADR', cellClass: 'text-center' },
    { headerName: 'Enhance Outcome', field: 'enhanced', cellClass: 'text-center' },
    { headerName: 'Cost Savings Outcome', field: 'cost', cellClass: 'text-center' },

  ];


  constructor(private interventionService: InterventionService, private router: Router, private db: DatabaseService, private storage: LocalStorageService) { }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onSelectionChanged() {
    this.interventionIsSelected = true;
    this.interventionService.setSelectedIntervention(this.gridApi.getSelectedRows()[0]);
  }


  ngOnInit() {
    //one week filter.
    this.oneWeekAgo = new Date();
    this.oneWeekAgo.setDate(this.oneWeekAgo.getDate() - 7);

    let userRole = this.storage.getUserRole();
    if (userRole === "admin") {
      this.interventionSubscription = this.interventionService.getInterventions().subscribe(interventions => {
        this.rowData = interventions;
      }, err =>{
        console.log(err);
      });

    } else if (userRole === "faculty") {
      this.interventionSubscription = this.interventionService.getInterventionsByClinicalGroup().subscribe(interventions => {
        this.rowData = interventions;
      }, err => {
        console.log(err);
      })

    } else {
      this.interventionSubscription = this.interventionService.getInterventionsByUserId(this.storage.getUserId()).subscribe(interventions => {
        this.rowData = this.filterInterventions(interventions);
      }, err => {
        console.log(err);
      })
    }
  }

  ngOnDestroy() {
    this.interventionSubscription.unsubscribe();
  }

  formatEncounterLength(data) {
    for (let key in data) {
      switch (data[key].encounterLength) {
        case "less-than-equal-15-minutes":
          data[key].encounterLength = "<= 15 minutes";
          break;
        case "greater-than-equal-60-minutes":
          data[key].encounterLength = ">= 60 minutes";
          break;
        default:
          data[key].encounterLength = data[key].encounterLength.replace(/-([^-]*)$/, " " + '$1');
          break;
      }
    }
  }

  export() {
    var params = {
      fileName: this.fileName
    };

    this.gridApi.exportDataAsCsv(params);
  }

  filterInterventions(interventions: Array<any>): Array<any> {
    let filteredInterventions = this.db.filterGreaterThan(interventions, "timestamp", this.oneWeekAgo.getTime());
    return filteredInterventions;
  }

  editIntervention() {
    this.router.navigate(['/intervention']);
  }

}
