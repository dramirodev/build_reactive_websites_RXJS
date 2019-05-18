import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PerfService } from './perf.service';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { UserDetailResolver } from './user-detail-resolver.service';
import { PhoneNumComponent } from './phone-num/phone-num.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    PizzaOrderComponent,
    PhoneNumComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PerfService,
    UserDetailResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private perf: PerfService) {}
}
