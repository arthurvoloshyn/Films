import React from 'react';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './MoviesFormHoc';

class MoviesForm extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleSave = e => {
    e.preventDefault();

    const { selectedValue, onClose, addMovie, updateMovie } = this.props;
    const { id, name, genre, rate, directorId, watched } = selectedValue;

    id
      ? updateMovie({ id, name, genre, watched: !!watched, rate: +rate, directorId })
      : addMovie({ name, genre, watched: !!watched, rate: +rate, directorId });
    onClose();
  };

  render() {
    const { data = {}, classes, open, handleChange, handleSelectChange, handleCheckboxChange, selectedValue = {} } = this.props;
    const { name, genre, rate, directorId, watched } = selectedValue;
    const { directors = [] } = data;

    return (
      <Dialog onClose={this.handleClose} open={open} aria-labelledby="simple-dialog-title">
        <DialogTitle className={classes.title} id="simple-dialog-title">Movie information</DialogTitle>
        <form onSubmit={this.handleSave} className={classes.container} autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={name}
            onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            id="outlined-genre"
            label="Genre"
            className={classes.textField}
            value={genre}
            onChange={handleChange('genre')}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            id="outlined-rate"
            label="Rate"
            value={rate}
            onChange={handleChange('rate')}
            type="number"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <FormControl variant="outlined" className={classes.formControlSelect} required>
            <InputLabel
              ref={ref => { this.InputLabelRef = ref; }}
              htmlFor="outlined-age-simple"
            >
              Director
            </InputLabel>
            <Select
              value={directorId}
              onChange={handleSelectChange}
              input={<OutlinedInput name="directorId" id="outlined-director" labelWidth={70} />}
            >
            {directors.map(director => <MenuItem key={director.id} value={director.id}>{director.name}</MenuItem>)}
            </Select>
          </FormControl>
          <div className={classes.wrapper}>
            <FormControlLabel
              control={<Checkbox checked={watched} onChange={handleCheckboxChange('watched')} value="watched" />}
              label="Watched movie"
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              <SaveIcon /> Save
            </Button>
          </div>
        </form>
      </Dialog>
    );
  }
};

  export default withHocs(MoviesForm);
