import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {
  directorsInitState,
  directorsFormElementsList,
  directorsTableHeadList,
} from '../../constants/directors';
import SearchTable from '../SearchTable/SearchTable';
import Form from '../Form/Form';
import withHocs from './DirectorsHoc';

class Directors extends Component {
  state = directorsInitState;

  handleClickOpen = data =>
    this.setState({
      ...data,
      open: true,
    });

  handleClose = () => this.setState(directorsInitState);

  handleChange = name => ({ target }) => this.setState({ [name]: target.value });

  render() {
    const { name, age, id, open } = this.state;
    const {
      classes,
      directorsWithMoviesQuery: { directors = [], fetchMore },
      addDirector,
      updateDirector,
      deleteDirector,
    } = this.props;

    const formElementsList = directorsFormElementsList(name, age);

    return (
      <>
        <Form
          formElementsList={formElementsList}
          handleAdd={addDirector}
          handleChange={this.handleChange}
          handleUpdate={updateDirector}
          onClose={this.handleClose}
          open={open}
          selectedValue={{ id, name, age: +age }}
          title="Director information"
        />
        <div className={classes.wrapper}>
          <SearchTable
            fetchMore={fetchMore}
            handleDelete={deleteDirector}
            onOpen={this.handleClickOpen}
            tableBodyList={directors}
            tableHeadList={directorsTableHeadList}
          />
          <Fab
            aria-label="Add"
            className={classes.fab}
            color="primary"
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
}

Directors.propTypes = {
  classes: PropTypes.object.isRequired,
  addDirector: PropTypes.func.isRequired,
  updateDirector: PropTypes.func.isRequired,
  deleteDirector: PropTypes.func.isRequired,
  directorsWithMoviesQuery: PropTypes.shape({
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        age: PropTypes.number,
        movies: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
          }),
        ),
      }),
    ),
    fetchMore: PropTypes.func,
  }).isRequired,
};

export default withHocs(Directors);
