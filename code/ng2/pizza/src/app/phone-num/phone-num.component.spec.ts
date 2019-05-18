import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumComponent } from './phone-num.component';

describe('PhoneNumComponent', () => {
  let component: PhoneNumComponent;
  let fixture: ComponentFixture<PhoneNumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneNumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
