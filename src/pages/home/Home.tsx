import React, { memo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        {BUSIEST_AIRPORTS.map((airportInfo) => (
          <Grid key={airportInfo.code} item xs={3}>
            <AirportCard airportInfo={airportInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default memo(Home);
