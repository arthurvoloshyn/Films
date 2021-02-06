import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFormProps } from '../../../utils/getCollectionData';
import SearchTable from '../SearchTable/SearchTable';
import Form from '../Form/Form';
import AddFab from '../AddFab/AddFab';
import withHocs from './NavigationTableHoc';

class NavigationTable extends Component {
  constructor(props) {
    super(props);

    const { initState } = this.props;

    this.state = initState;
  }

  handleClickOpen = (data = {}) => {
    const { isMovies } = this.props;
    const moviesOptions = isMovies && { directorId: data.director?.id || '' };

    this.setState({
      ...data,
      ...moviesOptions,
      open: true,
    });
  };

  handleClose = () => {
    const { initState } = this.props;
    this.setState(initState);
  };

  handleChange = name => ({ target: { type, value, checked } }) => {
    const val = type === 'checkbox' ? checked : value;

    this.setState({ [name]: val });
  };

  render() {
    const { open, ...state } = this.state;
    const {
      classes,
      isMovies,
      formProps: { getFormElementsList, getFormCheckbox, formElementSelectOptions, ...formProps },
      searchTableProps,
    } = this.props;

    const { selectedValue, formElementsList, formCheckbox } = getFormProps(
      isMovies,
      state,
      getFormElementsList,
      formElementSelectOptions,
      getFormCheckbox,
    );

    return (
      <>
        <Form
          {...formProps}
          formCheckbox={formCheckbox}
          formElementsList={formElementsList}
          handleChange={this.handleChange}
          onClose={this.handleClose}
          open={open}
          selectedValue={selectedValue}
        />
        <div className={classes.wrapper}>
          <SearchTable {...searchTableProps} onOpen={this.handleClickOpen} />
          <AddFab handleClickOpen={this.handleClickOpen} />
        </div>
      </>
    );
  }
}

NavigationTable.propTypes = {
  classes: PropTypes.object.isRequired,
  isMovies: PropTypes.bool,
  formProps: PropTypes.shape({
    getFormElementsList: PropTypes.func,
    getFormCheckbox: PropTypes.func,
    formElementSelectOptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  }),
  searchTableProps: PropTypes.shape({}),
  initState: PropTypes.shape({}),
};

NavigationTable.defaultProps = {
  isMovies: false,
  formProps: {
    getFormElementsList: () => {},
    getFormCheckbox: () => {},
    formElementSelectOptions: [],
  },
  searchTableProps: {},
  initState: {},
};

export default withHocs(NavigationTable);
