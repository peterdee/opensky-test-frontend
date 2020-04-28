import React, { memo, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Modal from '../Modal';
import FlightsList from '../FlightsList';

import styles from './AirportCard.module.scss';

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 200,
  },
});

interface AirportInfo {
  name: string;
  code: string;
  country: string;
  city: string;
  icao: string;
}

interface AirportCardProps {
  airportInfo: AirportInfo;
}

function AirportCard(props: AirportCardProps): React.ReactElement {
  const {
    airportInfo: {
      name,
      code,
      country,
      city,
      icao,
    },
  } = props;
  const classes = useStyles();

  const [isOpenModal, setOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openModal}>
        <CardContent>
          <Typography className={styles.title} gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`City: ${city}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Country: ${country}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Code: ${code}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`icao: ${icao}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Modal
        isOpen={isOpenModal}
        closeModal={closeModal}
      >
        <FlightsList icao={icao} />
      </Modal>
    </Card>
  );
}

export default memo(AirportCard);
