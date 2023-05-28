import {ValidationErrors} from "@angular/forms";

export interface ICountry {
  country: string,
  calling_code: number
}

export interface ISignUp {
  email:  (string | (ValidationErrors | null)[])[] | null,
  password: (string | (ValidationErrors | null)[])[] | null,
  firstName: (string | (ValidationErrors | null)[])[] | null,
  lastName: (string | (ValidationErrors | null)[])[] | null,
  dateOfBirth: Date | (string | (ValidationErrors | null)[])[] | null,
  gender: (string | (ValidationErrors | null)[])[] | null,
  countryCode: (string | (ValidationErrors | null)[])[] | null,
  phone: (string | (ValidationErrors | null)[])[] | null,
  citizenship:(string | (ValidationErrors | null)[])[] | null,
  agreement: (false| (ValidationErrors | null)[])[] | null,
}
export interface IProfile{
    email:   string,
    password:  string,
    firstName:  string,
    lastName:  string,
    dateOfBirth: Date |  string,
    gender:  string,
    countryCode:  string,
    phone:  string,
    citizenship: string,
    agreement: string
}

export interface IUser {
  email:  (string | (ValidationErrors | null)[])[] | null,
  password: (string | (ValidationErrors | null)[])[] | null,
}
export interface IAirports {
  key: string,
  name: string,
  city: string,
  gmt: string,
  country: string
}
export interface IToken {
  token: string | null | undefined;
}
export interface IResponseAuth {
  token: IToken;
  statusCode: number,
  message: string
}
