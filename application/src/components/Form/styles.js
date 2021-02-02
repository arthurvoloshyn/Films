export default theme => ({
  container: {
    padding: theme.spacing(2),
  },
  title: {
    paddingBottom: 0,
  },
  textField: {
    width: '100%',
  },
  formControlSelect: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  wrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  fluidWrapper: {
    justifyContent: 'flex-end',
  },
  button: {
    minWidth: 100,
    minHeight: 42,
  },
});
