import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import MoviesTable from '../MoviesTable/MoviesTable';
import MoviesForm from '../MoviesForm/MoviesForm';

import withHocs from './MoviesHoc';

class Movies extends React.Component {
  state = {
    open: false,
    name: '',
    genre: '',
    watched: false,
    rate: 0,
    directorId: '',
  };

  handleClickOpen = (data = {}) => {
    this.setState({
      ...data,
      open: true,
      directorId: data.director ? data.director.id : '',
    });
  };

  handleClose = () => {
    this.setState({
      name: '',
      genre: '',
      watched: false,
      rate: 0,
      directorId: '',
      id: null,
      open: false,
    });
  };

  handleSelectChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleCheckboxChange = name => ({ target }) => {
    this.setState({ [name]: target.checked });
  };

  handleChange = name => ({ target }) => {
    this.setState({ [name]: target.value });
  };

  render() {
    const { id, name, genre, watched, rate, directorId, open } = this.state;
    const { classes } = this.props;

    return (
      <>
        <MoviesForm
          handleChange={this.handleChange}
          handleCheckboxChange={this.handleCheckboxChange}
          handleSelectChange={this.handleSelectChange}
          onClose={this.handleClose}
          open={open}
          selectedValue={{
            id,
            name,
            genre,
            watched,
            rate,
            directorId,
          }}
        />
        <div className={classes.wrapper}>
          <MoviesTable onClose={this.handleClose} onOpen={this.handleClickOpen} />
          <Fab
            aria-label="Add"
            className={classes.fab}
            color="primary"
            onClick={() => this.handleClickOpen()}
          >
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
}

export default withHocs(Movies);
