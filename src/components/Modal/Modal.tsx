import React, { memo } from 'react';
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
  closeModal: () => void;
}

function TransitionsModal(props: TransitionsModalProps): React.ReactElement {
  const {
    children,
    isOpen,
    closeModal,
  } = props;

  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        onBackdropClick={closeModal}
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
