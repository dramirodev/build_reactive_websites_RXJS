import { Action } from '@ngrx/store';

const ADD_PATIENTS = 'ADD_PATIENTS';
const UPDATE_PATIENT = 'UPDATE_PATIENT';

export class AddPatientsAction implements Action {
  type = ADD_PATIENTS;
  constructor(public payload) {}
}
export class UpdatePatientAction implements Action {
  type = UPDATE_PATIENT;
  constructor(public payload) {}
}

type PatientAction = AddPatientsAction | UpdatePatientAction;

export function patientReducer(state = [], action: PatientAction) { // (1)
  switch (action.type) { // (2)
    case UPDATE_PATIENT:
      return state.map((item, idx) => // (3)
        idx === action.payload.index ? action.payload.newPatient : item
      );
    case ADD_PATIENTS: // (4)
      return [...state, ...action.payload];
    default: // (5)
      return state;
  }
}
