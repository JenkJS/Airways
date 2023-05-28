
interface IPlace{
  key: string,
  country: string,
  city: string,
  name: string
}
export interface FlightsResponse {
  form: IPlace
  to: IPlace,
  takeoffDate: Date,
  landingDate: Date,
  timeMins: number,
  seats: {
  avaible: number,
    total: number
},
  price: {
  eur: number | undefined,
    usd: number | undefined,
    rub: number | undefined,
    pln: number | undefined,
},
  otherFlights: { [key: string]: FlightsResponse };
  flightNumber: string;
  isSelected?: boolean;
}
export interface FlightsRequest {
  fromKey: string | null | undefined,
  toKey: string | null | undefined,
  forwardDate: string | null | undefined,
  backDate?: string | null | undefined
}
export interface IAirportMock {
  "code": "AAA",
  "lat": "-17.3595",
  "lon": "-145.494",
  "name": "Anaa Airport",
  "city": "Anaa",
  "state": "Tuamotu-Gambier",
  "country": "French Polynesia",
  "woeid": "12512819",
  "tz": "Pacific\/Midway",
  "phone": "",
  "type": "Airports",
  "email": "",
  "url": "",
  "runway_length": "4921",
  "elev": "7",
  "icao": "NTGA",
  "direct_flights": "2",
  "carriers": "1"
}
