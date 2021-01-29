import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import DirectorsDialog from '../DirectorsDialog/DirectorsDialog';
import MoviesSearch from '../MoviesSearch/MoviesSearch';

import withHocs from './DirectorsTableHoc';

class DirectorsTable extends React.Component {
  state = {
    anchorEl: null,
    openDialog: false,
    name: '',
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState({ [name]: value });
  };

  handleSearch = ({ key }) => {
    const { data } = this.props;
    const { name } = this.state;

    key === 'Enter' &&
      data.fetchMore({
        variables: { name },
        updateQuery: (_, { fetchMoreResult }) => fetchMoreResult,
      });
  };

  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false });
  };

  handleClick = ({ currentTarget }, data) => {
    this.setState({
      anchorEl: currentTarget,
      data,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEdit = row => {
    this.props.onOpen(this.state.data);
    this.handleClose();
  };

  handleDelete = () => {
    this.handleDialogOpen();
    this.handleClose();
  };

  render() {
    const { anchorEl, openDialog, data: activeElem = {}, name } = this.state;
    const { classes, data = {} } = this.props;
    const { directors = [] } = data;

    return (
      <>
        <Paper>
          <MoviesSearch
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            name={name}
          />
        </Paper>
        <DirectorsDialog
          handleClose={this.handleDialogClose}
          id={activeElem.id}
          open={openDialog}
        />
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell>Movies</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {directors.map(director => (
                <TableRow key={director.id}>
                  <TableCell component="th" scope="row">
                    {director.name}
                  </TableCell>
                  <TableCell align="right">{director.age}</TableCell>
                  <TableCell>
                    {director.movies.length
                      ? director.movies.map((movie, key) => (
                          <div key={movie.name}>
                            {`${key + 1}. `}
                            {movie.name}
                          </div>
                        ))
                      : 'No movies'}
                  </TableCell>
                  <TableCell align="right">
                    <>
                      <IconButton color="inherit" onClick={e => this.handleClick(e, director)}>
                        <MoreIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        id="simple-menu"
                        onClose={this.handleClose}
                        open={Boolean(anchorEl)}
                      >
                        <MenuItem onClick={() => this.handleEdit(director)}>
                          <CreateIcon /> Edit
                        </MenuItem>
                        <MenuItem onClick={this.handleDelete}>
                          <DeleteIcon /> Delete
                        </MenuItem>
                      </Menu>
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

export default withHocs(DirectorsTable);
