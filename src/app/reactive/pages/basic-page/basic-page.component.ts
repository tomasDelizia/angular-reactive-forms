import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
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

  // form = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStock: new FormControl(0),
  // });
}
