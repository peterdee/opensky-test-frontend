import React, {
  memo, useCallback, useEffect, useState, useMemo,
} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// only for react-window lib
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import getFlightsByAirport from '../../api';
import { FLIGHTS_INTERVALS } from '../../utils/constants';
import { FlightDataInterface } from '../../utils/interfaces';
import FlightInfo from '../FlightInfo';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  padded: {
    padding: 20,
  },
  list: {
    width: '100%',
    height: 400,
    backgroundColor: theme.palette.background.paper,
  },
  centered: {
    justifyContent: 'center',
    display: 'flex',
  },
}));

interface FlightsListProps {
  icao: string;
}

const flightsDataInitialState: Array<FlightDataInterface> = [];

function FlightsList(props: FlightsListProps): React.ReactElement {
  const { icao } = props;

  const classes = useStyles();

  // 0 - departures
  // 1 - arriving
  const [tab, setTab] = useState(0);
  const [flyInterval, setFlyInterval] = useState(FLIGHTS_INTERVALS[0]);
  const [arrivingData, setArrivingData] = useState(flightsDataInitialState);
  const [departuresData, setDeparturesData] = useState(flightsDataInitialState);

  useEffect(() => {
    const isDepartures = tab === 0;
    let cancel = false;

    getFlightsByAirport({
      icao,
      interval: flyInterval,
      type: isDepartures ? 'departures' : 'arriving',
    }).then((data) => {
      if (!cancel) {
        if (isDepartures) {
          setDeparturesData(data);
        } else {
          setArrivingData(data);
        }
      }
    });

    return (): void => {
      cancel = true;
    };
  }, [icao, flyInterval, tab]);

  const handleChangeTab = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  }, []);

  const handleChangeInterval = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setFlyInterval(event.target.value as number);
  }, []);

  const currentFlightsData = useMemo(() => (
    tab === 0 ? departuresData : arrivingData
  ), [tab, departuresData, arrivingData]);

  const renderRow = useCallback((renderRowProps: ListChildComponentProps) => {
    const { index, style } = renderRowProps;

    return (
      <ListItem button style={style} key={index}>
        <ListItemText>
          <FlightInfo flightData={currentFlightsData[index] || {}} />
        </ListItemText>
      </ListItem>
    );
  }, [currentFlightsData]);

  return (
    <Paper className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleChangeTab}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        centered
      >
        <Tab label="departing" />
        <Tab label="arriving" />
      </Tabs>

      <div className={classes.padded}>
        <Typography component="p">
          For the last:
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">hours</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={flyInterval}
            onChange={handleChangeInterval}
          >
            {FLIGHTS_INTERVALS.map((interval) => (
              <MenuItem key={interval} value={interval}>{interval}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {currentFlightsData.length > 0 ? (
        <div className={classes.list}>
          <FixedSizeList
            height={400}
            width="100%"
            itemSize={200}
            itemCount={currentFlightsData.length}
          >
            {renderRow}
          </FixedSizeList>
        </div>
      ) : (
        <Typography
          className={`${classes.centered} ${classes.padded}`}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          No results
        </Typography>
      )}
    </Paper>
  );
}

export default memo(FlightsList);
