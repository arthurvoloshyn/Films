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
      ? updateMovie({
          id,
          name,
          genre,
          watched: !!watched,
          rate: +rate,
          directorId,
        })
      : addMovie({
          name,
          genre,
          watched: !!watched,
          rate: +rate,
          directorId,
        });
    onClose();
  };

  render() {
    const {
      data = {},
      classes,
      open,
      handleChange,
      handleSelectChange,
      handleCheckboxChange,
      selectedValue = {},
    } = this.props;
    const { name, genre, rate, directorId, watched } = selectedValue;
    const { directors = [] } = data;

    return (
      <Dialog aria-labelledby="simple-dialog-title" onClose={this.handleClose} open={open}>
        <DialogTitle className={classes.title} id="simple-dialog-title">
          Movie information
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
            id="outlined-genre"
            label="Genre"
            margin="normal"
            onChange={handleChange('genre')}
            required
            value={genre}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            id="outlined-rate"
            label="Rate"
            margin="normal"
            onChange={handleChange('rate')}
            type="number"
            value={rate}
            variant="outlined"
          />
          <FormControl className={classes.formControlSelect} required variant="outlined">
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Director
            </InputLabel>
            <Select
              input={<OutlinedInput id="outlined-director" labelWidth={70} name="directorId" />}
              onChange={handleSelectChange}
              value={directorId}
            >
              {directors.map(director => (
                <MenuItem key={director.id} value={director.id}>
                  {director.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className={classes.wrapper}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={watched}
                  onChange={handleCheckboxChange('watched')}
                  value="watched"
                />
              }
              label="Watched movie"
            />
            <Button className={classes.button} color="primary" type="submit" variant="contained">
              <SaveIcon /> Save
            </Button>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default withHocs(MoviesForm);
