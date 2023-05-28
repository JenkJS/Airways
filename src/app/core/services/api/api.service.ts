import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {
  IAirports,
  FlightsRequest,
  FlightsResponse,
  ISignUp,
  IResponseAuth,
  IToken,
  IUser,
  FlightsStateService
} from '../../../core/index';
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public flight$: BehaviorSubject<FlightsResponse[] | null>;
  public airports$: BehaviorSubject<IAirports[] | null>;
  public token$: BehaviorSubject<IToken | null>;
  public errors$: BehaviorSubject<string | null>;
  public isAuth$: BehaviorSubject<boolean>;
  public profile$: BehaviorSubject<Partial<ISignUp|null>>;
  public firstName$: BehaviorSubject<Partial<(string | (ValidationErrors | null)[])[] | null | undefined>>;


  constructor(private http: HttpClient,
              private flightsStateService: FlightsStateService) {
    this.flight$ = new BehaviorSubject<FlightsResponse[] | null>(null);
    this.airports$ = new BehaviorSubject<IAirports[] | null>(null);
    this.token$ = new BehaviorSubject<IToken | null>(null);
    this.errors$ = new BehaviorSubject<string | null>(null)
    this.isAuth$ = new BehaviorSubject<boolean>(false);
    this.profile$ = new BehaviorSubject<Partial<ISignUp|null>>(null)
    this.firstName$ = new BehaviorSubject<Partial<(string | (ValidationErrors | null)[])[] | null | undefined>>(null)

    this.checkAuth()

  }
  public getAirports():Subscription {
  // @ts-ignore
    return this.http.get('search/airport').subscribe((value:IAirports[]) => {
    this.airports$.next(value)
  })
  }


  public getFlight(data:FlightsRequest){
    return this.http.post('search/flight',
      data
      // @ts-ignore
    ).subscribe((res: FlightsResponse[] )=> {
      this.flight$.next(res);
      this.flightsStateService.flights = res;
    });
  }

  public checkAuth(){
    let token
    if(localStorage.getItem('token') || this.token$.value){
      if(localStorage.getItem('token')){
        token = JSON.parse(localStorage.getItem('token') as string)
      } else {
        token = this.token$
      }
      const headers = ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })

      return this.http.get('auth/me', {headers: headers }).subscribe((res: Partial<ISignUp>)=>{
        this.isAuth$.next(true)
        this.profile$.next(res)
        this.firstName$.next(res.firstName)
      })
    }
    return 
  }
  public onSignIn(data: ISignUp): Observable<IResponseAuth>{
    // @ts-ignore
    return this.http.post('auth/registration', data)}

  public  Login(data: IUser): Observable<IToken> {
    // @ts-ignore
    return this.http.post<Observable<IToken>>('auth/login', data)
  }

}
