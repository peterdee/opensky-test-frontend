export interface FlightDataInterface {
  arrivalAirportCandidatesCount: number;
  callsign: string;
  departureAirportCandidatesCount: number;
  estArrivalAirport: string;
  estArrivalAirportHorizDistance: number;
  estArrivalAirportVertDistance: number;
  estDepartureAirport: string;
  estDepartureAirportHorizDistance: number;
  estDepartureAirportVertDistance: number;
  firstSeen: number;
  icao24: string;
  lastSeen: number;
}

export interface GetFlightsDataInterface {
  icao: string;
  interval: number;
  type: 'arriving' | 'departures';
}
