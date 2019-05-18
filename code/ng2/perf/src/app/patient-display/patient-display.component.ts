import { Component, OnInit, Input } from '@angular/core';
import { PatientDataService } from '../patient-data.service';

@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.css']
})
export class PatientDisplayComponent implements OnInit {
  @Input() patient;
  changeWardClass = ['hidden'];

  constructor(private patientData: PatientDataService) { }

  ngOnInit() {
  }

  updateWard(newWard) {
    this.patient.currentWard = newWard;
    this.patientData.updatePatient(this.patient);
  }

  showChangeWard() {
    this.changeWardClass = [];
  }
}
