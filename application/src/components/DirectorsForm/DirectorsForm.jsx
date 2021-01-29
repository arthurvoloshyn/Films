import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './DirectorsFormHoc';

class DirectorsForm extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleSave = e => {
    e.preventDefault();

    const { selectedValue, onClose, addDirector, updateDirector } = this.props;
    const { id, name, age } = selectedValue;

    id ? updateDirector({ id, name, age: +age }) : addDirector({ name, age: +age });
    onClose();
  };

  render() {
    const { classes, open, handleChange, selectedValue = {} } = this.props;
    const { name, age } = selectedValue;

    return (
      <Dialog aria-labelledby="simple-dialog-title" onClose={this.handleClose} open={open}>
        <DialogTitle className={classes.title} id="simple-dialog-title">
          Director information
        </DialogTitle>
        <form autoComplete="off" className={classes.container} onSubmit={this.handleSave}>
          <TextField
            className={classes.textField}
            id="outlined-name"
            label="Name"
            margin="normal"
            onChange={handleChange('name')}
            required
            value={name}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            id="outlined-rate"
            label="Age"
            margin="normal"
            onChange={handleChange('age')}
            required
            type="number"
            value={age}
            variant="outlined"
          />
          <div className={classes.wrapper}>
            <Button className={classes.button} color="primary" type="submit" variant="contained">
              <SaveIcon /> Save
            </Button>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default withHocs(DirectorsForm);
