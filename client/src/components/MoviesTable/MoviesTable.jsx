import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, Delete, Create } from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import { MoviesDialog } from '../MoviesDialog/MoviesDialog';
import { MoviesSearch } from '../MoviesSearch/MoviesSearch';
import { markMovieViewingMutation } from './mutations';
import { moviesQuery } from './queries';
import { styles } from './styles';

export const MoviesTable = withStyles(styles)(({ classes, onOpen }) => {
  const [state, setState] = useState({
    anchorEl: null,
    openDialog: false,
    activeElem: {},
    name: ''
  });

  const { data = [], fetchMore } = useQuery(moviesQuery, { variables: { name: state.name } });
  const [markMovieViewing] = useMutation(markMovieViewingMutation, { refetchQueries: [moviesQuery, 'movies'] });
  const handleMovieViewing = (id, watched) => {
    markMovieViewing({ variables: { id, watched}})
  }

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      fetchMore({
        variables: { name: state.name },
        updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
      });
    }
  };

  const handleDialogOpen = () => setState({ ...state, openDialog: true });
  const handleDialogClose = () => setState({ ...state, openDialog: false, anchorEl: null });

  const handleClick = ({ currentTarget }, data) => {
    setState({
      ...state,
      anchorEl: currentTarget,
      activeElem: data,
    });
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null, openDialog: false });
  };

  const handleEdit = () => {
    onOpen(state.activeElem);
    handleClose();
  };

  const handleDelete = () => {
    handleDialogOpen();
  };

  const { anchorEl, openDialog, activeElem, name } = state;
  const { movies = [] } = data;

  return (
    <>
      <Paper classes={{
        root: classes.paperRoot,
      }}>
        <MoviesSearch name={name} handleChange={handleChange} handleSearch={handleSearch}/>
      </Paper>
      <MoviesDialog open={openDialog} handleClose={handleDialogClose} id={activeElem.id} />
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Watched</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map(movie => (
              <TableRow key={movie.id}>
                <TableCell component="th" scope="row">{movie.name}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell align="right">{movie.rate}</TableCell>
                <TableCell>{movie.director?.name || ''}</TableCell>
                <TableCell>
                  <Checkbox checked={movie.watched} onClick={() => handleMovieViewing(movie.id, !movie.watched)} />
                </TableCell>
                <TableCell align="right">
                  <>
                    <IconButton color="inherit" onClick={(e) => handleClick(e, movie)}>
                      <MoreVert />
                    </IconButton>
                    <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                      <MenuItem onClick={handleEdit}><Create /> Edit</MenuItem>
                      <MenuItem onClick={handleDelete}><Delete/> Delete</MenuItem>
                    </Menu>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
});
