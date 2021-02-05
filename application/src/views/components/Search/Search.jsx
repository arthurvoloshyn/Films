import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import withHocs from './SearchHoc';

const Search = ({ classes, name, handleChange, handleSearch }) => (
  <div className={classes.search}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      onChange={handleChange('name')}
      onKeyPress={handleSearch}
      placeholder="Search..."
      value={name}
    />
  </div>
);

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  handleSearch: PropTypes.func,
};

Search.defaultProps = {
  name: '',
  handleChange: () => {},
  handleSearch: () => {},
};

export default withHocs(Search);
