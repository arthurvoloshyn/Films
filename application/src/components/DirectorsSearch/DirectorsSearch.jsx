import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import withHocs from './DirectorsSearchHoc';

class DirectorsSearch extends React.Component {
  handleKeyPress = e => {
    const { handleSearch } = this.props;
    handleSearch(e);
  };

  render() {
    const { classes, name, handleChange } = this.props;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={handleChange('name')}
          onKeyPress={this.handleKeyPress}
          value={name}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }
}

export default withHocs(DirectorsSearch);
