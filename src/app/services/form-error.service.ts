import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  constructor() { }

  getFormViolations(e: any): Array<any> {
    let errors: Array<any> = [];

    e.error.violations.forEach((element: any) => {
      errors[element.propertyPath] = element.message
    });

    return errors;
  }
}
