import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  // Si se hacen modificaciones a regions(), no afecta la propiedad privada _regions
  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    return this.http.get<Country[]>(
      `${this.baseUrl}/region/${region}?fields=name,cca3,borders`
    );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    return this.http.get<Country>(
      `${this.baseUrl}/alpha/${alphaCode}?fields=name,cca3,borders`
    );
  }

  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    if (!codes || codes.length === 0) return of([]);
    const requests: Observable<Country>[] = [];
    codes.forEach((code) => requests.push(this.getCountryByAlphaCode(code)));
    // Devuelve todas las peticiones cuando hayan sido resueltas
    return combineLatest(requests);
  }
}
