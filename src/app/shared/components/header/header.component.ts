import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, pipe, filter } from 'rxjs';
import { ApiService, AuthService, IResponseAuth, ISignUp, CurrencyServiceService, FlightsResponse } from '../../../core';
import { LocationService } from 'src/app/core/services/location/location.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  isOpen$!: BehaviorSubject<boolean>;
  isAuth$!: BehaviorSubject<boolean>;
  firstName$!: BehaviorSubject<
    Partial<(string | (ValidationErrors | null)[])[] | null | undefined>
  >;
  currentPath!: string;
  selectedCurrency!: string;

  constructor(
    private AuthService: AuthService,
    private locationService: LocationService,
    private ApiService: ApiService,
    private currencyService: CurrencyServiceService
  ) {}

  ngOnInit(): void {
    this.isOpen$ = this.AuthService.dialogIsOpen$;
    this.isAuth$ = this.AuthService.isAuth$;
    this.firstName$ = this.ApiService.firstName$;
    this.locationService.currentLocation.subscribe(
      (path) => (this.currentPath = path)
    );
    this.selectedCurrency = this.currencySelectForm.value!;
  }

  dateSelectForm = new FormControl('MM/DD/YYYY');
  currencySelectForm = new FormControl('USD');

  openDialog() {
    this.AuthService.onOpen();
  }

  onLogout() {
    this.AuthService.onLogout();
  }

  checkLocation() {
    console.log(this.currentPath);
    return this.currentPath;
  }

  onCurrencyChange(currency: string): void {
    this.currencyService.setCurrency(currency.toLowerCase());
  }
}
