import React, {
  memo,
} from 'react';
import Typography from '@material-ui/core/Typography';

import { FlightDataInterface } from '../../utils/interfaces';

interface FlightInfoProps {
  flightData: FlightDataInterface;
}

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};
const getLocaleDate = (epochTime: number): string => (
  new Date(epochTime * 1000).toLocaleDateString('en', options)
);

function FlightInfo(props: FlightInfoProps): React.ReactElement {
  const {
    flightData: {
      callsign,
      estArrivalAirport,
      estDepartureAirport,
      firstSeen,
      icao24,
      lastSeen,
    },
  } = props;

  return (
    <div>
      <Typography variant="body2" component="p">
        {`Callsign: ${callsign}`}
      </Typography>
      <Typography variant="body2" component="p">
        {`Address of the transponder (icao24): ${icao24}`}
      </Typography>
      <Typography variant="body2" component="p">
        {`Estimated time of arrival: ${getLocaleDate(lastSeen)}`}
      </Typography>
      <Typography variant="body2" component="p">
        {`Estimated time of departure: ${getLocaleDate(firstSeen)}`}
      </Typography>
      <Typography variant="body2" component="p">
        {`Arrival airport: ${estArrivalAirport}`}
      </Typography>
      <Typography variant="body2" component="p">
        {`Departure airport: ${estDepartureAirport}`}
      </Typography>
    </div>
  );
}

export default memo(FlightInfo);
