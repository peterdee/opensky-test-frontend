import axios from 'axios';

import { FlightDataInterface, GetFlightsDataInterface } from '../utils/interfaces';

import {
  ARRIVALS_API_ENDPOINT,
  DEPARTURES_API_ENDPOINT,
} from './constnts';

const HOUR_SECONDS = 3600;

function getEpoch(): number {
  return Math.round((new Date()).getTime() / 1000);
}

async function getFlightsByAirport(
  data: GetFlightsDataInterface,
): Promise<Array<FlightDataInterface>> {
  try {
    const {
      icao,
      interval,
      type,
    } = data;
    const end = getEpoch();
    const begin = end - (interval * HOUR_SECONDS);
    const url = type === 'arriving' ? ARRIVALS_API_ENDPOINT : DEPARTURES_API_ENDPOINT;
    const response = await axios.get(url, {
      params: {
        airport: icao,
        begin: begin.toString(),
        end: end.toString(),
      },
    });

    return response.data;
  } catch (error) {
    return [];
  }
}

export default getFlightsByAirport;
