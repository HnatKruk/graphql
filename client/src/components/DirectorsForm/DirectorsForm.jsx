import React from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, DialogTitle, Dialog } from '@mui/material';
import { Save } from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import { addDirectorMutation, updateDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries'
import { moviesQuery } from '../MoviesTable/queries';
import { styles } from './styles';

export const DirectorsForm = withStyles(styles)(({
  classes,
  open,
  handleChange,
  onClose,
  selectedValue = {},
}) => {
  const [addDirector] = useMutation(addDirectorMutation, { refetchQueries: [directorsQuery, 'directors'] });
  const [updateDirector] = useMutation(updateDirectorMutation, { refetchQueries: [directorsQuery, 'directors', moviesQuery, 'movies',] });
  const { id, name, age } = selectedValue;
  const handleClose = () => { onClose() };

  const handleSave = () => {
    id ? updateDirector({ variables: { id, name, age: Number(age) }}) : addDirector({ variables: { name, age: Number(age) }})
    onClose();
  };

  const formErrors = [
    { name: 'Error Name', isError: name.length === 0, text: 'Please enter name of director' },
  ]

  return (
    <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle className={classes.title} id="simple-dialog-title">Director information</DialogTitle>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-rate"
          label="Age"
          className={classes.textField}
          value={age}
          onChange={handleChange('age')}
          type="number"
          margin="normal"
          variant="outlined"
          InputProps={{ inputProps: { min: 1, max: 10 } }}

        />
        <div className={classes.wrapper}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={formErrors.some((error) => error.isError)}
          >
            <Save /> Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
});
