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
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  form: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantsNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    console.log(this.form.value);
    this.form.markAllAsTouched();
  }
}
