import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils; // También se podría hacer como un servicio inyectable

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
