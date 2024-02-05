import React from 'react';
import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DeleteForever, Block } from '@mui/icons-material';
import { deleteMovieMutation } from './mutations';
import { moviesQuery } from '../MoviesTable/queries'
import { directorsQuery } from '../DirectorsTable/queries';

export const MoviesDialog = ({ open, handleClose, id }) => {
  const [deleteMovie] = useMutation(deleteMovieMutation, { refetchQueries: [moviesQuery, 'movies', directorsQuery, 'directors'] });
  const handleDelete = () => {
    deleteMovie({ variables: { id } });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure that you want to delete element?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you click 'Confirm' this element will be removed from the database.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <Block /> Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          <DeleteForever/> Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
