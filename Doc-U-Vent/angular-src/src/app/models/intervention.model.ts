export class Intervention {
  user_id: String;
  date: Date;
  timestamp: number;
  pharmacistName: String = "";
  practiceSite: String = "";
  DrugInformation: boolean = false;
  Pharmacokinetics: boolean = false;
  Pharmacotherapeutics: boolean = false;
  PatientEducation: boolean = false;
  otherTypeOfIntervention: String = "";
  adrIdentified:boolean = false;
  discontinuationOfDrugTherapy:boolean = false;
  doseAdjustment:boolean = false;
  doseCalculation:boolean = false;
  drugInformationProvided:boolean = false;
  medicationReconciliation:boolean = false;
  monitoringRecommendations:boolean = false;
  newDrugTherapyAdded:boolean = false;
  nonPharmacologicalRecommendation:boolean = false;
  drugInteractionIdentified:boolean = false;
  duplicateTherapyIdentified:boolean = false;
  immunizationAdministered:boolean = false;
  diseaseStateEducation:boolean = false;
  newMedicationEducation: boolean = false;
  pointOfCareA:boolean = false;
  pointOfCareLipids:boolean = false;
  pointOfCareBloodGlucose:boolean = false;
  pointOfCareAlbumin:boolean = false;
  bloodPressureScreening:boolean = false;
  otherIntervention:String = "";
  recommendation: String = "";
  recommendationAcceptance: String = "";
  modifiedThenAccepted: String = "";
  phone: boolean = false;
  provider: boolean = false;
  patient: boolean = false;
  written: boolean = false;
  otherModeOfRecommendation: String = "";
  encounterLength: String = "";
  clinicalSig: String = "";
  ADR: boolean = false;
  cost: boolean = false;
  enhanced: boolean = false;
  otherOutcome: String = "";
  key?: any;
  clinicalGroup: string = "";


  constructor(init:Partial<Intervention>)
  {
    Object.assign(this,init);
  }


 expectedOutcomesAreValid()
  {
    if(!this.ADR && !this.cost && !this.enhanced)
    {
      return false;
    }

    return true;
  }

  typeOfInterventionIsValid()
  {
      if(!this.DrugInformation && !this.Pharmacokinetics && !this.Pharmacotherapeutics && !this.PatientEducation)
      {
          return false;
      }
      return true;
  }

  modeOfRecommendationIsValid()
  {
      if(!this.phone && !this.written && !this.provider && !this.patient)
      {
          return false;
      }
      return true;
  }

   interventionIsValid()
  {
    if(!this.adrIdentified && !this.discontinuationOfDrugTherapy && !this.doseAdjustment && !this.doseCalculation && !this.drugInformationProvided
      && !this.medicationReconciliation && !this.monitoringRecommendations && !this.newDrugTherapyAdded && !this.nonPharmacologicalRecommendation
      && !this.drugInteractionIdentified && !this.duplicateTherapyIdentified && !this.immunizationAdministered && !this.diseaseStateEducation && !this.newMedicationEducation
      && !this.pointOfCareA && !this.pointOfCareLipids && !this.pointOfCareBloodGlucose && !this.pointOfCareAlbumin && !this.bloodPressureScreening)
    {

      return false;
    }

    return true;
  }

}
