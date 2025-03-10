import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
      ],
      [
        /** Validadores asíncronos */
      ],
    ],
    price: [0],
    inStock: [0],
  });

  // form = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStock: new FormControl(0),
  // });
}
