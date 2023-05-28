import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer } from 'rxjs';
import { Country } from '../../../shared/data/country';
import {
  ICountry,
  IProfile,
  IResponseAuth,
  ISignUp,
  IToken,
  IUser,
} from '../../models/auth.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../../shared/components/auth/auth.component';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  borderLineLogin = 'or log in with your email';
  borderLineSignup = 'or sign up with your email';
  public dialogIsOpen$: BehaviorSubject<boolean>;
  public isLogin$: BehaviorSubject<boolean>;
  textBorder$: BehaviorSubject<string>;
  citizenship$: BehaviorSubject<ICountry[]>;
  public isAuth$: BehaviorSubject<boolean>;
  public firstName$: BehaviorSubject<string | null | undefined>;
  public profile$: BehaviorSubject<Partial<ISignUp | null>>;

  constructor(public dialog: MatDialog, public ApiService: ApiService) {
    this.dialogIsOpen$ = new BehaviorSubject<boolean>(false);
    this.isLogin$ = new BehaviorSubject<boolean>(true);
    this.textBorder$ = new BehaviorSubject<string>(this.borderLineLogin);
    this.citizenship$ = new BehaviorSubject<ICountry[]>(Country);
    this.firstName$ = new BehaviorSubject<string | null | undefined>(null);
    this.isAuth$ = this.ApiService.isAuth$;
    this.profile$ = this.ApiService.profile$;
    this.checkAuth();
  }

  onOpen() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '494px',
      id: '22',
    });

    dialogRef.afterClosed().subscribe((result) => {});
    // this.dialogIsOpen$.next(this.dialogIsOpen$.value ? false : true)
  }
  onSwitch(value: boolean) {
    this.isLogin$.next(value);
    if (value) {
      this.textBorder$.next(this.borderLineLogin);
    } else {
      this.textBorder$.next(this.borderLineSignup);
    }
  }
  onSaveToLocalStorage(profile: Partial<ISignUp>) {
    if (profile) {
      this.ApiService.onSignIn(profile as ISignUp).subscribe(
        (res) => {
          if (res.token) {
            this.ApiService.token$.next(res.token);
            localStorage.setItem('token', JSON.stringify(res.token));
            this.dialog.closeAll();
            this.ApiService.checkAuth();
          }
        },
        (error) => {
          this.ApiService.errors$.next(error.error.message);
        }
      );
    }
  }

  onSaveToLocalStorageAuth() {
    this.isAuth$.next(true);
    localStorage.setItem('auth', 'true');
  }

  onLogin(user: Partial<IUser>) {
    if (user) {
      // @ts-ignore
      this.ApiService.Login(user as IUser).subscribe(
        (res) => {
          if (res.token) {
            // @ts-ignore
            this.ApiService.token$.next(res.token as IToken);
            localStorage.setItem('token', JSON.stringify(res.token));
            this.dialog.closeAll();
            this.ApiService.checkAuth();
          }
        },
        (error) => {
          this.ApiService.errors$.next(error.error.message);
        }
      );
    }
  }

  checkAuth() {
    if (localStorage.getItem('profile')) {
      // @ts-ignore
      const profile = JSON.parse(localStorage.getItem('profile'));
      this.profile$.next(profile as Partial<ISignUp | null>);
      // @ts-ignore
      this.firstName$.next(this.profile$.value?.firstName);
    }
    if (localStorage.getItem('auth')) {
      this.onSaveToLocalStorageAuth();
    }
  }
  onLogout() {
    this.isAuth$.next(false);
    localStorage.removeItem('token');
  }
}
