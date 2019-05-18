import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-phone-num',
  templateUrl: './phone-num.component.html',
  styleUrls: ['./phone-num.component.css']
})
export class PhoneNumComponent implements OnInit {
  phoneNumber = new FormControl('', [
    (control: AbstractControl) => {
      // remove anything that isn't a digit
      const numDigits = control.value.replace(/[^\d]+/g, '').length;
      // Only worried about US-based numbers for now, no need for country code
      if (numDigits === 10) { return null; }
      // Uh oh, something's wrong
      if (numDigits > 10) {
        return {
          tooLong: { numDigits }
        };
      } else {
        return {
          tooShort: { numDigits }
        };
      }
    }
  ]);
  constructor() { }

  ngOnInit() {
  }

}
