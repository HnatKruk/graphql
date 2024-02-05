import React, { useState, useCallback } from 'react';
import { Fab, } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DirectorsTable } from '../DirectorsTable/DirectorsTable';
import { DirectorsForm } from '../DirectorsForm/DirectorsForm';
import { withStyles } from '@mui/styles';
import { styles } from './styles';

export const Directors = withStyles(styles)(({ classes }) => {
  const [state, setState] = useState({
    open: false,
    name: '',
    age: 1,
    id: null,
  });

  const handleClickOpen = useCallback((data) => {
    setState(prevState => ({
      ...prevState,
      open: true,
      ...data,
    }));
  }, []);

  const handleClose = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      name: '',
      age: 0,
      id: null,
      open: false,
    }));
  }, []);

  const handleChange = useCallback(name => ({ target }) => {
    setState(prevState => ({
      ...prevState,
      [name]: target.value,
    }));
  }, []);

  const { name, age, id, open } = state;

  return (
    <>
      <DirectorsForm handleChange={handleChange} selectedValue={{ name, age, id }} open={open} onClose={handleClose} />
      <div className={classes.wrapper}>
        <DirectorsTable onOpen={handleClickOpen} onClose={handleClose} />
        <Fab onClick={() => handleClickOpen(null)} color="primary" aria-label="Add" className={classes.fab} style={{ position: 'fixed' }}>
          <Add />
        </Fab>
      </div>
    </>
  );
});
