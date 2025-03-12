import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => setTimeout(() => resolve(true), 2000));
}

export class FormUtils {
  // Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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

  static fieldsEqual(field1: string, field2: string): ValidationErrors | null {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value
        ? null
        : {
            fieldsNotEqual: true,
          };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue !== 'hola@mundo.com') return null;
    return { emailTaken: true };
  }

  private static getErrorMessage(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres o elementos`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
        case 'email':
          return 'El email no es válido';
        case 'emailTaken':
          return 'El email ya está en uso';
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return 'Ingrese su nombre completo';
          }
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'Ingrese un email válido';
          }
          return 'Error de patrón contra expresión regular';
        default:
          console.log('Error no manejado en FormUtils:', key);
          return 'El campo es inválido';
      }
    }
    return null;
  }
}
