import React, { useState } from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { MoviesTable } from '../MoviesTable/MoviesTable';
import { MoviesForm } from '../MoviesForm/MoviesForm';
import { withStyles } from '@mui/styles';
import { styles } from './styles';

export const Movies = withStyles(styles)(({ classes }) => {
  const [state, setState] = useState({
    open: false,
    name: '',
    genre: '',
    watched: false,
    rate: 0,
    directorId: '',
  });

  const handleClickOpen = (data = {}) => {
    setState(prevState => ({
      ...prevState,
      open: true,
      ...data,
      directorId: data.director ? data.director.id : '',
    }));
  };

  const handleClose = () => {
    setState({
      name: '',
      genre: '',
      watched: false,
      rate: 0,
      directorId: '',
      open: false,
    });
  };

  const handleSelectChange = ({ target }) => {
    setState(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleCheckboxChange = name => ({ target }) => {
    setState(prevState => ({
      ...prevState,
      [name]: target.checked,
    }));
  };

  const handleChange = name => ({ target }) => {
    setState(prevState => ({
      ...prevState,
      [name]: target.value,
    }));
  };

  const { id, name, genre, watched, rate, directorId, open } = state;

  return (
    <>
      <MoviesForm
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleCheckboxChange={handleCheckboxChange}
        selectedValue={{ id, name, genre, watched, rate, directorId }}
        open={open}
        onClose={handleClose}
      />
      <div className={classes.wrapper}>
        <MoviesTable onOpen={handleClickOpen} onClose={handleClose} />
        <Fab onClick={() => handleClickOpen()} color="primary" aria-label="Add" className={classes.fab} style={{ position: 'fixed' }} >
          <Add />
        </Fab>
      </div>
    </>
  );
});
