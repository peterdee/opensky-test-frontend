import React, { memo, useCallback } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: '50%',
  },
}));

interface TransitionsModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen(isOpen: boolean): void;
}

function TransitionsModal(props: TransitionsModalProps): React.ReactElement {
  const {
    children,
    isOpen,
    setOpen,
  } = props;

  const classes = useStyles();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        onBackdropClick={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default memo(TransitionsModal);
