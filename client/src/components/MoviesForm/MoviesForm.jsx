import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TextField, OutlinedInput, MenuItem, Select, Checkbox, FormControl, FormControlLabel, InputLabel, Button, DialogTitle, Dialog } from '@mui/material';
import { Save } from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import { moviesQuery } from '../MoviesTable/queries';
import { addMovieMutation, updateMovieMutation } from './mutation';
import { directorsQuery } from '../DirectorsTable/queries';
import { styles } from './styles';

export const MoviesForm = withStyles(styles)(({
  classes,
  open,
  handleChange,
  handleSelectChange,
  handleCheckboxChange,
  selectedValue = {},
  onClose,
}) => {
  const { name, genre, rate, directorId, watched } = selectedValue;

  const { data = {} } = useQuery(directorsQuery, { variables: { name: '' } });
  const [addMovie] = useMutation(addMovieMutation, { refetchQueries: [moviesQuery, 'movies', directorsQuery, 'directors'] });
  const [updateMovie] = useMutation(updateMovieMutation, { refetchQueries: [moviesQuery, 'movies', directorsQuery, 'directors'] });

  const { directors = [] } = data;

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    const { id, name, genre, rate, directorId, watched } = selectedValue;
    id
      ? updateMovie({ variables: { id, name, genre, rate: Number(rate), directorId, watched: Boolean(watched) }})
      : addMovie({ variables: { name, genre, directorId, rate: Number(rate), watched: Boolean(watched) } });
    onClose();
  };

  const formErrors = [
    { name: 'Error Name', isError: name.length === 0, text: 'Please enter name of movie' },
    { name: 'Error Name', isError: genre.length === 0, text: 'Please enter genre of movie' },
    { name: 'Error Directors', isError: directorId.length === 0, text: 'Please choose director  of movie' },
    { name: 'No Directors', isError: directors.length === 0, text: 'Please add directors in "Directors" tab' },
  ]

  return (
    <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle className={classes.title} id="simple-dialog-title">Movie information</DialogTitle>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
          helperText="Incorrect entry."
        />
        <TextField
          id="outlined-genre"
          label="Genre"
          className={classes.textField}
          value={genre}
          onChange={handleChange('genre')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-rate"
          label="Rate"
          value={rate}
          onChange={handleChange('rate')}
          type="number"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <FormControl variant="outlined" className={classes.formControlSelect}>
          <InputLabel htmlFor="outlined-director">Director</InputLabel>
          <Select
            value={directorId}
            onChange={handleSelectChange}
            input={<OutlinedInput name="directorId" id="outlined-director" labelwidth={70} />}
          >
            {directors.map(director => (
              <MenuItem key={director.id} value={director.id}>
                {director.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {directors.length === 0 && <p className={classes.directorsError}>Please add directors in "Directors" tab</p>}
        <div className={classes.wrapper1}>
          <FormControlLabel
            control={<Checkbox checked={watched} onChange={handleCheckboxChange('watched')} value="watched" />}
            label="Watched movie"
          />
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
