import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-row',
  templateUrl: './patient-row.component.html',
  styleUrls: ['./patient-row.component.css']
})
export class PatientRowComponent implements OnInit {
  @Input() patientRowData;

  constructor() { }

  ngOnInit() {}

}
