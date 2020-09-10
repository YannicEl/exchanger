import { Component, OnInit } from '@angular/core';
import {
  ExchangeRateService,
  Rate,
} from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  from = '1.000';
  currFrom: string;

  to = '0';
  currTo: string;

  rates: Rate[] = [];

  loading = true;

  constructor(private exchange: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchange.getExchangeRates().subscribe((res) => {
      this.rates = res;

      this.to = res.find((e) => e.curr === 'USD').rate.toFixed(4);
      this.currTo = res.find((e) => e.curr === 'USD').curr;

      this.currFrom = res.find((e) => e.curr === 'EUR').curr;

      this.loading = false;
    });
  }

  updateTo() {
    console.log(this.currFrom);
    this.to = (
      Number(this.from) * this.rates.find((e) => e.curr === this.currTo).rate
    ).toFixed(4);
  }

  updateFrom() {
    console.log(this.currTo);
    this.from = (
      Number(this.to) * this.rates.find((e) => e.curr === this.currFrom).rate
    ).toFixed(4);
  }
}
