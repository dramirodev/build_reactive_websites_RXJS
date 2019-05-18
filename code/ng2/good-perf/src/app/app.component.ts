import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PatientDataService } from './patient-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  patients$: Observable<any>;

  constructor(private store: Store<any>, private pd: PatientDataService) {}

  ngOnInit() {
    this.patients$ = this.store.select('patients');
  }
}
