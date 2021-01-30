import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import MoviesDialog from '../MoviesDialog/MoviesDialog';
import MoviesSearch from '../MoviesSearch/MoviesSearch';

import withHocs from './MoviesTableHoc';

class MoviesTable extends Component {
  state = {
    anchorEl: null,
    openDialog: false,
    searchName: '',
  };

  handleChange = name => ({ target: { value } }) => this.setState({ [name]: value });

  handleSearch = ({ key }) => {
    const { data } = this.props;
    const { searchName } = this.state;

    key === 'Enter' &&
      data.fetchMore({
        variables: { name: searchName },
        updateQuery: (_, { fetchMoreResult }) => fetchMoreResult,
      });
  };

  handleDialogOpen = () => this.setState({ openDialog: true });

  handleDialogClose = () => this.setState({ openDialog: false });

  handleClick = ({ currentTarget }, data) =>
    this.setState({
      anchorEl: currentTarget,
      data,
    });

  handleClose = () => this.setState({ anchorEl: null });

  handleEdit = () => {
    const { onOpen } = this.props;
    const { data } = this.state;

    onOpen(data);
    this.handleClose();
  };

  handleDelete = () => {
    this.handleDialogOpen();
    this.handleClose();
  };

  render() {
    const { anchorEl, openDialog, data: activeElem = {}, searchName } = this.state;

    const { classes, data = {} } = this.props;

    const { movies = [] } = data;

    const moviesTableHeadList = [
      { title: 'Name' },
      { title: 'Genre' },
      { title: 'Rate', align: 'right' },
      { title: 'Director' },
      { title: 'Watched' },
      { align: 'right' },
    ];

    return (
      <>
        <Paper>
          <MoviesSearch
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            name={searchName}
          />
        </Paper>
        <MoviesDialog handleClose={this.handleDialogClose} id={activeElem.id} open={openDialog} />
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                {moviesTableHeadList.map(({ title, align }, i) => (
                  <TableCell key={title || `moviesTableHeadCell_${i}`} align={align}>
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map(movie => {
                const handleClick = e => this.handleClick(e, movie);
                const { id, name, genre, rate, director, watched } = movie;

                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell>{genre}</TableCell>
                    <TableCell align="right">{rate}</TableCell>
                    <TableCell>{director?.name || 'No director'}</TableCell>
                    <TableCell>
                      <Checkbox checked={watched} disabled />
                    </TableCell>
                    <TableCell align="right">
                      <>
                        <IconButton color="inherit" onClick={handleClick}>
                          <MoreIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          id="simple-menu"
                          onClose={this.handleClose}
                          open={!!anchorEl}
                        >
                          <MenuItem onClick={this.handleEdit}>
                            <CreateIcon /> Edit
                          </MenuItem>
                          <MenuItem onClick={this.handleDelete}>
                            <DeleteIcon /> Delete
                          </MenuItem>
                        </Menu>
                      </>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

MoviesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        genre: PropTypes.string,
        rate: PropTypes.number,
        watched: PropTypes.bool,
        director: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    ),
    fetchMore: PropTypes.func,
  }).isRequired,
  onOpen: PropTypes.func,
};

MoviesTable.defaultProps = {
  onOpen: () => {},
};

export default withHocs(MoviesTable);
