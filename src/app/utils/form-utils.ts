import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static isInvalidField(form: FormGroup, field: string): boolean {
    return form.controls[field].touched && form.controls[field].invalid;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field].errors) return null;
    const errors = form.controls[field].errors ?? [];
    return FormUtils.getErrorMessage(errors);
  }

  static isInvalidFieldInArray(formArray: FormArray, index: number): boolean {
    return (
      formArray.controls[index].invalid && formArray.controls[index].touched
    );
  }

  static getFieldInArrayError(
    formArray: FormArray,
    index: number
  ): string | null {
    if (!formArray.controls[index].errors) return null;
    const errors = formArray.controls[index].errors ?? [];
    return FormUtils.getErrorMessage(errors);
  }

  private static getErrorMessage(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
      }
    }
    return null;
  }
}
