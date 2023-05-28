import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService, AuthService } from '../../../core';
import { LocationService } from 'src/app/core/services/location/location.service';
import { DateTypeService } from 'src/app/core/services/date-type/date-type.service';



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
  typeOfDate!: string;

  constructor(
    private AuthService: AuthService,
    private locationService: LocationService,
    private ApiService: ApiService,
    private dateType$: DateTypeService
  ) {}

  ngOnInit(): void {
    this.isOpen$ = this.AuthService.dialogIsOpen$;
    this.isAuth$ = this.AuthService.isAuth$;
    this.firstName$ = this.ApiService.firstName$;

    this.locationService.currentLocation.subscribe(
      (path) => (this.currentPath = path)
    );
  }

  get dateType() {
    return this.dateSelectForm.value;
  }

  dateSelectForm = new FormControl('MM/DD/YYYY');
  currencySelectForm = new FormControl('EUR');

  openDialog() {
    this.AuthService.onOpen();
  }

  onLogout() {
    this.AuthService.onLogout();
  }

  checkDate() {
    if (this.dateType) {
      this.dateType$.setDateType(this.dateType);
    }
  }
}
