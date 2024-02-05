import React from 'react';
import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DeleteForever, Block } from '@mui/icons-material';
import { deleteDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries'
import { moviesQuery } from '../MoviesTable/queries';

export const DirectorsDialog = ({ id, handleClose, open }) => {
  const [deleteDirector] = useMutation(deleteDirectorMutation, { refetchQueries: [directorsQuery, 'directors', moviesQuery, 'movies'] });
  const handleDelete = () => {
    deleteDirector({ variables: { id } });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sire that you want to delete element?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you click 'Confirm' this element will be removed from data base.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <Block /> Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          <DeleteForever /> Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
