import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BlockIcon from '@material-ui/icons/Block';

const DeleteDialog = ({ id, handleClose, handleDelete, open }) => {
  const handleConfirm = () => {
    handleDelete(id);
    handleClose();
  };

  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure that you want to delete the element?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you click &lsquo;Confirm&rsquo; this element will be removed from the database.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          <BlockIcon />
          Cancel
        </Button>
        <Button autoFocus color="primary" onClick={handleConfirm}>
          <DeleteForeverIcon />
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  id: PropTypes.string,
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
  open: PropTypes.bool,
};

DeleteDialog.defaultProps = {
  id: '',
  handleClose: () => {},
  handleDelete: () => {},
  open: false,
};

export default DeleteDialog;
