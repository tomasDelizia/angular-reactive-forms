import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: [
      '',
      [
        /** Validadores síncronos */
        Validators.required,
        Validators.minLength(3),
      ],
      [
        /** Validadores asíncronos */
      ],
    ],
    price: [0, [Validators.required, Validators.min(10)]],
    inStock: [0, [Validators.required, Validators.min(0)]],
  });

  isInvalidField(field: string): boolean | null {
    return (
      this.form.controls[field].touched && this.form.controls[field].invalid
    );
  }

  getFieldError(field: string): string | null {
    if (!this.form.controls[field].errors) return null;
    const errors = this.form.controls[field].errors ?? [];
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

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    this.form.reset({
      name: 'Coca Cola',
      price: 10,
      inStock: 500,
    });
  }

  // form = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStock: new FormControl(0),
  // });
}
