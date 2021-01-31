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

import withHocs from './MoviesFormHoc';

const MoviesForm = ({
  data: { directors },
  classes,
  open,
  handleChange,
  handleSelectChange,
  selectedValue,
  onClose,
  addMovie,
  updateMovie,
}) => {
  const handleSave = e => {
    e.preventDefault();

    const { id, name, genre, rate, directorId, watched } = selectedValue;

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

  const { name: movieName, genre, rate, directorId, watched } = selectedValue;

  const textFieldsList = [
    { id: 'outlined-name', label: 'Name', name: 'name', required: true, value: movieName },
    { id: 'outlined-genre', label: 'Genre', name: 'genre', required: true, value: genre },
    { id: 'outlined-rate', label: 'Rate', name: 'rate', required: false, value: rate },
  ];

  return (
    <Dialog aria-labelledby="simple-dialog-title" onClose={onClose} open={open}>
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Movie information
      </DialogTitle>
      <form autoComplete="off" className={classes.container} onSubmit={handleSave}>
        {textFieldsList.map(({ id, label, name, required, value }) => (
          <TextField
            key={id}
            className={classes.textField}
            id={id}
            label={label}
            margin="normal"
            onChange={handleChange(name)}
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
            {directors.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
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
            <SaveIcon /> Save
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
  }),
  open: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  selectedValue: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    genre: PropTypes.string,
    rate: PropTypes.number,
    directorId: PropTypes.string,
    watched: PropTypes.bool,
  }),
  onClose: PropTypes.func,
  addMovie: PropTypes.func,
  updateMovie: PropTypes.func,
};

MoviesForm.defaultProps = {
  data: {
    directors: [],
  },
  open: false,
  handleChange: () => {},
  handleSelectChange: () => {},
  selectedValue: {},
  onClose: () => {},
  addMovie: () => {},
  updateMovie: () => {},
};

export default withHocs(MoviesForm);
