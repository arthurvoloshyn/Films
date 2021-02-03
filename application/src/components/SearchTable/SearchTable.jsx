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

import { isNumber, isObjectOrNull, isBoolean, removeObjPropImmutably } from '../../utils/utils';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import Search from '../Search/Search';
import withHocs from './SearchTableHoc';

class SearchTable extends Component {
  state = {
    anchorEl: null,
    openDialog: false,
    name: '',
    data: {},
  };

  handleChange = name => ({ target: { value } }) => this.setState({ [name]: value });

  handleSearch = ({ key }) => {
    const { fetchMore } = this.props;
    const { name } = this.state;

    key === 'Enter' &&
      fetchMore({
        variables: { name },
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
    const { anchorEl, openDialog, data: activeElem, name: searchName } = this.state;

    const { classes, tableBodyList, handleDelete, tableHeadList } = this.props;

    return (
      <>
        <Paper>
          <Search
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            name={searchName}
          />
        </Paper>
        <DeleteDialog
          handleClose={this.handleDialogClose}
          handleDelete={handleDelete}
          id={activeElem.id}
          open={openDialog}
        />
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeadList.map(({ title, align }, i) => (
                  <TableCell key={title || `tableHeadCell_${i}`} align={align}>
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBodyList.map(tableBodyEl => {
                const handleClick = e => this.handleClick(e, tableBodyEl);
                const { id, name, ...tableBodyElProps } = tableBodyEl;
                const newTableBodyElProps = removeObjPropImmutably(tableBodyElProps, '__typename');
                const tableBodyElPropsValues = Object.values(newTableBodyElProps);

                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    {tableBodyElPropsValues.map((tableBodyElPropValue, i) => (
                      <TableCell
                        key={`tableBodyCell_${i}`}
                        align={isNumber(tableBodyElPropValue) ? 'right' : 'left'}
                      >
                        {isBoolean(tableBodyElPropValue) ? (
                          <Checkbox checked={tableBodyElPropValue} disabled />
                        ) : Array.isArray(tableBodyElPropValue) ? (
                          <>
                            {tableBodyElPropValue.length
                              ? tableBodyElPropValue.map(({ name }, key) => (
                                  <div key={name}>
                                    {`${key + 1}. `}
                                    {name}
                                  </div>
                                ))
                              : 'No data'}
                          </>
                        ) : isObjectOrNull(tableBodyElPropValue) ? (
                          tableBodyElPropValue?.name || 'No data'
                        ) : (
                          tableBodyElPropValue
                        )}
                      </TableCell>
                    ))}
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
                            <CreateIcon />
                            Edit
                          </MenuItem>
                          <MenuItem onClick={this.handleDelete}>
                            <DeleteIcon />
                            Delete
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

SearchTable.propTypes = {
  classes: PropTypes.object.isRequired,
  onOpen: PropTypes.func,
  handleDelete: PropTypes.func,
  tableBodyList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ),
  tableHeadList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      align: PropTypes.string,
    }),
  ),
  fetchMore: PropTypes.func,
};

SearchTable.defaultProps = {
  onOpen: () => {},
  handleDelete: () => {},
  tableBodyList: [],
  tableHeadList: [],
  fetchMore: () => {},
};

export default withHocs(SearchTable);
