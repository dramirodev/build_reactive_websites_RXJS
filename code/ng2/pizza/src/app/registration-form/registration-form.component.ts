import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms/src/model';
import { map, debounceTime } from 'rxjs/operators';

const addressModel = {
  street: ['', Validators.required],
  apartment: [''],
  city: ['', Validators.required],
  state: ['', Validators.required],
  zip: ['', [
    Validators.required,
    Validators.pattern(/\d{5}/)
  ]]
};

const ccModel = {
  cc: ['', [
    Validators.required,
    (ac: AbstractControl) => {
      // Convert string to array of digits
      const ccArr: number[] = ac.value.split('').map(digit => Number(digit));
      // double every other digit, starting from the right
      let shouldDouble = false;
      const sum = ccArr.reduceRight((accumulator, item) => {
        if (shouldDouble) {
          item = item * 2;
          // sum the digits, tens digit will always be one
          if (item > 9) {
            item = 1 + (item % 10);
          }
        }
        shouldDouble = !shouldDouble;
        return accumulator + item;
      }, 0);

      if (sum % 10 !== 0) {
        return { ccInvalid: true };
      }
    }
  ]],
  cvc: ['', Validators.required],
  expirationMonth: ['', [
      Validators.required,
      Validators.min(1),
      Validators.max(12)
  ]],
  expirationYear: ['', [
    Validators.required,
    Validators.min((new Date()).getFullYear())
  ]]
};

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  endpoint: 'http://localhost:3000/api/';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    const checkAddress = (control: AbstractControl) => {
      const address = {
        street: control.get('street').value,
        apartment: control.get('apartment').value,
        city: control.get('city').value,
        state: control.get('state').value,
        zip: control.get('zip').value
      };
      return this.http.get(this.endpoint + 'reactiveForms/addressCheck/' + address)
      .pipe(
        debounceTime(333),
        map((res: any) => {
          if (!res.validAddress) {
            return { invalidAddress: true };
          }
        })
      );
    };

    this.registrationForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5)
      ],
        [(control) => {
          return this.http.get(this.endpoint + 'reactiveForms/usernameCheck/'
             + control.value)
          .pipe(
            map((res: any) => {
              if (res.taken) {
                return { usernameTaken: true };
              }
            })
          );
        }]
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[1-9]\d{2}-\d{3}-\d{4}/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(12),
        (ac: AbstractControl) => {
          const currentVal: string = ac.value;
          // Password must contain at least three of the four options
          // Uppercase, lowercase, number, special symbol
          let matches = 0;
          if (currentVal.match(/[A-Z]+/)) {
            matches++;
          }
          if (currentVal.match(/[a-z]+/)) {
            matches++;
          }
          if (currentVal.match(/\d+/)) {
            matches++;
          }
          if (currentVal.replace(/[A-Za-z0-9]/g, '')) {
            matches++;
          }
          if (matches < 3) {
            return { passwordComplexityFailed: true };
          }
        }
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      addresses: this.fb.array([
        this.fb.group(addressModel, {
          asyncValidator: checkAddress
        })
      ]),
      creditCard: this.fb.group(ccModel)
    }, {
        validator: (ac: AbstractControl) => {
          const pw = ac.get('password').value;
          const cpw = ac.get('confirmPassword').value;
          if (pw !== cpw) {
            ac.get('confirmPassword').setErrors({passwordMismatch: true});
          }
        }
    });

    if (window.localStorage.registrationForm) {
      this.registrationForm.setValue(
           JSON.parse(window.localStorage.registrationForm));
    }

    this.registrationForm.valueChanges
    .subscribe(newForm => {
      window.localStorage.registrationForm = JSON.stringify(newForm);
    });
  }

  get username() { return this.registrationForm.get('username'); }
  get phoneNumber() { return this.registrationForm.get('phoneNumber'); }

  get addresses() {
    return this.registrationForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.fb.group(addressModel));
  }

  save() {
    return this.http.post(this.endpoint + 'reactiveForms/user/save',
       this.registrationForm.value)
    .subscribe(
      next => window.localStorage.registrationForm = '',
      err => console.log(err),
      () => console.log('done')
    );
  }

}
