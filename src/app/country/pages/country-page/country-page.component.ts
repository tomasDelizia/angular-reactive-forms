import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private fb = inject(FormBuilder);
  countryService = inject(CountryService);

  form = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanup(() => {
      console.log('Unsubscribed from regionSubscription');
      regionSubscription?.unsubscribe();
      console.log('Unsubscribed from countrySubscription');
      countrySubscription?.unsubscribe();
    });
  });

  private onRegionChanged() {
    return this.form
      .get('region')
      ?.valueChanges.pipe(
        tap(() => this.resetCountriesAndSelection()),
        tap(() => this.resetCountryBordersAndSelection()),
        // Verificamos que la region no sea vacía antes de enviar la petición
        filter((region) => !!region),
        // Convertimos lo que devuelve valueChanges en un observable de países
        switchMap((region) => this.countryService.getCountriesByRegion(region!))
      )
      .subscribe((countriesByRegion) => {
        this.countriesByRegion.set(countriesByRegion);
        console.log({ countriesByRegion });
      });
  }

  private onCountryChanged() {
    return this.form
      .get('country')
      ?.valueChanges.pipe(
        tap(() => this.resetCountryBordersAndSelection()),
        filter((country) => !!country),
        switchMap((country) =>
          this.countryService.getCountryByAlphaCode(country!)
        ),
        switchMap((country) =>
          this.countryService.getCountriesByCodes(country?.borders ?? [])
        )
      )
      .subscribe((borders) => {
        this.borders.set(borders);
        console.log({ borders });
      });
  }

  private resetCountriesAndSelection() {
    this.form.get('country')?.setValue('');
    this.countriesByRegion.set([]);
  }

  private resetCountryBordersAndSelection() {
    this.form.get('border')?.setValue('');
    this.borders.set([]);
  }
}
