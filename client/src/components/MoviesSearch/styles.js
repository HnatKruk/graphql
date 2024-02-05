export const styles = theme => ({
  search: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    paddingLeft: theme.spacing(4),

  },
  inputInput: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});
