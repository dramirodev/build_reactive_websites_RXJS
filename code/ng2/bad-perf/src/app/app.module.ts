import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PatientRowComponent } from './patient-row/patient-row.component';
import { PatientDisplayComponent } from './patient-display/patient-display.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientRowComponent,
    PatientDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
