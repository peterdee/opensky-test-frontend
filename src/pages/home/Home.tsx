import React, { memo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

import AirportCard from '../../components/AirportCard';
import { BUSIEST_AIRPORTS } from '../../utils/constants';

const useStyles = makeStyles(() => createStyles({
  root: {
    flexGrow: 1,
    padding: 100,
  },
}));

function Home(): React.ReactElement {
  const classes = useStyles();
  const isAuthenticated = Boolean(localStorage.getItem('isAuthenticated')) || false;

  return (
    <div className={classes.root}>
      {!isAuthenticated && <Redirect exact from="*" to="/login" />}
      <Grid container spacing={7}>
        {BUSIEST_AIRPORTS.map((airportInfo) => (
          <Grid
            item
            key={airportInfo.code}
            lg="auto"
          >
            <AirportCard airportInfo={airportInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default memo(Home);
