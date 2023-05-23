import { Component, OnInit } from '@angular/core';
import {FormControl, ValidationErrors} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, pipe, filter } from 'rxjs';
import {ApiService, AuthService, IResponseAuth, ISignUp} from '../../../core';
import { LocationService } from 'src/app/core/services/location/location.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  isOpen$!: BehaviorSubject<boolean>;
  isAuth$!: BehaviorSubject<boolean>;
  firstName$!: BehaviorSubject<Partial<(string | (ValidationErrors | null)[])[] | null | undefined>>;
  currentPath!: string;

  constructor(
    private AuthService: AuthService,
    private locationService: LocationService,
    private ApiService: ApiService
  ) {}

  ngOnInit(): void {
    this.isOpen$ = this.AuthService.dialogIsOpen$;
    this.isAuth$ = this.AuthService.isAuth$;
    this.firstName$ = this.ApiService.firstName$;
    this.locationService.currentLocation.subscribe((path)=> this.currentPath = path)
  }

  dateSelectForm = new FormControl('MM/DD/YYYY');
  currencySelectForm = new FormControl('EUR');

  openDialog() {
    this.AuthService.onOpen();
  }

  onLogout() {
    this.AuthService.onLogout();
  }

  checkLocation(){
    console.log(this.currentPath)
    return this.currentPath;
  }
}
