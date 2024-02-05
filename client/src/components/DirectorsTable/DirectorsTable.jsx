import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, MenuItem, Menu } from '@mui/material';
import { MoreVert, Delete, Create } from '@mui/icons-material';
import { DirectorsDialog } from '../DirectorsDialog/DirectorsDialog';
import { DirectorsSearch } from '../DirectorsSearch/DirectorsSearch';
import { withStyles } from '@mui/styles';
import { directorsQuery } from './queries';
import { styles } from './styles';

export const DirectorsTable = withStyles(styles)(({ classes, onOpen }) => {
  const [state, setState] = useState({
    anchorEl: null,
    openDialog: false,
    name: '',
    activeElem: {},
  });

  const { data = [], fetchMore } = useQuery(directorsQuery, { variables: { name: state.name } });

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSearch = (e) => {
    const { name } = state;

    if (e.keyCode === 13) {
      fetchMore({
        variables: { name },
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

  const handleClose = () => { setState({ ...state, anchorEl: null }); };

  const handleEdit = (row) => {
    onOpen(state.activeElem);
    handleClose();
  };

  const handleDelete = () => {
    handleDialogOpen();
  };

  const { anchorEl, openDialog, activeElem, name } = state;
  const { directors = [] } = data;

  return (
    <>
      <Paper classes={{
          root: classes.paperRoot,
        }}>
        <DirectorsSearch name={name} handleChange={handleChange} handleSearch={handleSearch}/>
      </Paper>
      <DirectorsDialog open={openDialog} handleClose={handleDialogClose} id={activeElem.id} />
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell>Movies</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {directors.map(director => {
              return (
                <TableRow key={director.id}>
                  <TableCell component="th" scope="row">{director.name}</TableCell>
                  <TableCell align="right">{director.age}</TableCell>
                  <TableCell>
                    {director.movies.map((movie, key) => <div key={movie.name}>{`${key+1}. `}{movie.name}</div>)}
                  </TableCell>
                  <TableCell align="right">
                    <>
                      <IconButton color="inherit" onClick={(e) => handleClick(e, director)}>
                        <MoreVert />
                      </IconButton>
                      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                        <MenuItem onClick={() => handleEdit(director)}><Create /> Edit</MenuItem>
                        <MenuItem onClick={handleDelete}><Delete /> Delete</MenuItem>
                      </Menu>
                    </>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
});
