import { Injectable } from '@angular/core';
import * as faker from 'faker';

const NUM_PATIENTS = 1200;
const PATIENTS_PER_ROW = 6;

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {
  patients = [];
  patientsByRow = [];
  wardTypes = [
    'Emergency',
    'Cardiology',
    'ICU',
    'Neurology',
    'Oncology',
    'Maternity'
  ];

  constructor() {
    for (let i = 0; i < NUM_PATIENTS; i++) {
      this.patients.push({
        avatar: faker.image.avatar(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        currentWard: this.wardTypes[Math.floor(Math.random() * this.wardTypes.length)],
        idx: i
      });
    }

    this.makeRows();
  }

  updatePatient(newData) {
    this.patients[newData.idx] = newData;
    this.makeRows();
  }

  private makeRows() {
    this.patientsByRow = [];
    // Make rows
    for (let i = 0; i < NUM_PATIENTS; i += PATIENTS_PER_ROW) {
      this.patientsByRow.push(this.patients.slice(i, i + PATIENTS_PER_ROW));
    }
  }
}
