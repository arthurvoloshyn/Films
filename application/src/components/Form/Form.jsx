import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

import withHocs from './FormHoc';

const Form = ({
  formElementsList,
  formCheckbox,
  classes,
  open,
  handleChange,
  onClose,
  title,
  handleUpdate,
  handleAdd,
  selectedValue: { id, ...selectedValueProps },
}) => {
  const handleSave = e => {
    e.preventDefault();

    id ? handleUpdate({ ...selectedValueProps, id }) : handleAdd(selectedValueProps);
    onClose();
  };

  const wrapperClasses = classNames(classes.wrapper, { formCheckbox: classes.fluidWrapper });

  return (
    <Dialog aria-labelledby="simple-dialog-title" onClose={onClose} open={open}>
      <DialogTitle className={classes.title} id="simple-dialog-title">
        {title}
      </DialogTitle>
      <form autoComplete="off" className={classes.container} onSubmit={handleSave}>
        {formElementsList.map(
          ({
            id: formElementId,
            name: formElementName,
            label,
            required,
            value,
            labelWidth,
            options,
            type,
          }) => (
            <Fragment key={formElementId}>
              {options ? (
                <FormControl
                  className={classes.formControlSelect}
                  required={required}
                  variant="outlined"
                >
                  <InputLabel htmlFor={formElementId}>{label}</InputLabel>
                  <Select
                    input={<OutlinedInput id={formElementId} labelWidth={labelWidth || 70} />}
                    onChange={handleChange(formElementName)}
                    value={value}
                  >
                    {options.map(({ id: optionId, name: optionName }) => (
                      <MenuItem key={optionId} value={optionId}>
                        {optionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  className={classes.textField}
                  id={formElementId}
                  label={label}
                  margin="normal"
                  onChange={handleChange(formElementName)}
                  required={required}
                  type={type || 'text'}
                  value={value}
                  variant="outlined"
                />
              )}
            </Fragment>
          ),
        )}
        <div className={wrapperClasses}>
          {formCheckbox && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formCheckbox.checked}
                  onChange={handleChange(formCheckbox.name)}
                  required={formCheckbox.required}
                  value={formCheckbox.value}
                />
              }
              label={formCheckbox.label}
            />
          )}
          <Button className={classes.button} color="primary" type="submit" variant="contained">
            <SaveIcon />
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  handleChange: PropTypes.func,
  selectedValue: PropTypes.shape({
    id: PropTypes.string,
  }),
  onClose: PropTypes.func,
  title: PropTypes.string,
  handleUpdate: PropTypes.func,
  handleAdd: PropTypes.func,
  formCheckbox: PropTypes.shape({
    checked: PropTypes.bool,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  formElementsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      label: PropTypes.string,
      required: PropTypes.bool,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.string,
      labelWidth: PropTypes.number,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        }),
      ),
    }),
  ),
};

Form.defaultProps = {
  open: false,
  handleChange: () => {},
  selectedValue: {},
  onClose: () => {},
  title: 'Simple title',
  handleUpdate: () => {},
  handleAdd: () => {},
  formCheckbox: null,
  formElementsList: [],
};

export default withHocs(Form);
