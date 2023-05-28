import { IAirports } from "./auth.model";

export interface ISearchFlightsForm {
  tripType: string;
  from: IAirports | null;
  dest: IAirports | null;
  date: {
    singleDate: string;
    startDate: string;
    endDate: string;
  };
  passengers: {
    adult: number;
    child: number;
    infant: number;
  };
}