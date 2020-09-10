import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Rate {
  curr: string;
  rate: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  rates: Rate[] = [{ curr: 'EUR', rate: 1 }];

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<Rate[]> {
    return this.http.get('https://api.exchangeratesapi.io/latest').pipe(
      map((e: any) => {
        for (const rate in e?.rates) {
          this.rates.push({ curr: rate, rate: e.rates[rate] });
        }
        return this.rates;
      })
    );
  }
}
