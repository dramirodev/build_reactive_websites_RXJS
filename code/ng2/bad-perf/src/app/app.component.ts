import { Component, OnInit } from '@angular/core';
import { PatientDataService } from './patient-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private patientData: PatientDataService) {}

  ngOnInit() {
  }
}
