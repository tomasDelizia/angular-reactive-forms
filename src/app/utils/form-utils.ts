import { FormGroup } from '@angular/forms';

export class FormUtils {
  static isInvalidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].touched && form.controls[field].invalid;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field].errors) return null;
    const errors = form.controls[field].errors ?? [];
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
