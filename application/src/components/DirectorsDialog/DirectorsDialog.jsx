import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BlockIcon from '@material-ui/icons/Block';

import withHocs from './DirectorsDialogHoc';

class DirectorsDialog extends React.Component {
  handleDelete = () => {
    const { id, handleClose, deleteDirector } = this.props;
    deleteDirector(id);
    handleClose();
  };

  render() {
    const { open, handleClose } = this.props;

    return (
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="alert-dialog-title">
          Are you sire that you want to delete element?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you click 'Confirm' this element will be removed from data base.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            <BlockIcon /> Cancel
          </Button>
          <Button autoFocus color="primary" onClick={this.handleDelete}>
            <DeleteForeverIcon /> Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withHocs(DirectorsDialog);
