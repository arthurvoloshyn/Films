import React from 'react';
import PropTypes from 'prop-types';
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

import { moviesFormTextFieldsList } from '../../constants/movies';
import withHocs from './MoviesFormHoc';

const MoviesForm = ({
  data: { directors = [] } = {},
  selectedValue: { id, name, genre, rate, directorId, watched },
  classes,
  open,
  handleChange,
  handleSelectChange,
  onClose,
  addMovie,
  updateMovie,
}) => {
  const handleSave = e => {
    e.preventDefault();

    const movieProps = {
      name,
      genre,
      watched: !!watched,
      rate: +rate,
      directorId,
    };

    id ? updateMovie({ ...movieProps, id }) : addMovie(movieProps);
    onClose();
  };

  const textFieldsList = moviesFormTextFieldsList(name, genre, rate);

  return (
    <Dialog aria-labelledby="simple-dialog-title" onClose={onClose} open={open}>
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Movie information
      </DialogTitle>
      <form autoComplete="off" className={classes.container} onSubmit={handleSave}>
        {textFieldsList.map(({ id: textFieldID, name: textFieldName, label, required, value }) => (
          <TextField
            key={textFieldID}
            className={classes.textField}
            id={textFieldID}
            label={label}
            margin="normal"
            onChange={handleChange(textFieldName)}
            required={required}
            value={value}
            variant="outlined"
          />
        ))}
        <FormControl className={classes.formControlSelect} required variant="outlined">
          <InputLabel htmlFor="outlined-age-simple">Director</InputLabel>
          <Select
            input={<OutlinedInput id="outlined-director" labelWidth={70} name="directorId" />}
            onChange={handleSelectChange}
            value={directorId}
          >
            {directors.map(({ id: directorID, name: directorName }) => (
              <MenuItem key={directorId} value={directorID}>
                {directorName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.wrapper}>
          <FormControlLabel
            control={
              <Checkbox checked={watched} onChange={handleChange('watched')} value="watched" />
            }
            label="Watched movie"
          />
          <Button className={classes.button} color="primary" type="submit" variant="contained">
            <SaveIcon />
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

MoviesForm.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  open: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  selectedValue: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    genre: PropTypes.string,
    rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    directorId: PropTypes.string,
    watched: PropTypes.bool,
  }),
  onClose: PropTypes.func,
  addMovie: PropTypes.func,
  updateMovie: PropTypes.func,
};

MoviesForm.defaultProps = {
  open: false,
  handleChange: () => {},
  handleSelectChange: () => {},
  selectedValue: {},
  onClose: () => {},
  addMovie: () => {},
  updateMovie: () => {},
};

export default withHocs(MoviesForm);
