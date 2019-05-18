import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { PatientRowComponent } from './patient-row/patient-row.component';
import { PatientDisplayComponent } from './patient-display/patient-display.component';
import { CdProfilerService } from './cd-profiler.service';
import { patientReducer } from './state';

@NgModule({
  declarations: [
    AppComponent,
    PatientRowComponent,
    PatientDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      patients: patientReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (private cd: CdProfilerService) {}
}
