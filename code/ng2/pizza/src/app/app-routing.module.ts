import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { UserDetailResolver } from './user-detail-resolver.service';
import { PhoneNumComponent } from './phone-num/phone-num.component';

const routes: Routes = [
  {
    path: 'phone',
    component: PhoneNumComponent
  },
  {
    path: 'registration',
    component: RegistrationFormComponent
  },
  {
    path: 'pizza',
    component: PizzaOrderComponent,
    resolve: {
      userDetails: UserDetailResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
