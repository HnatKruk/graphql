import React from 'react';
import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import { styles } from './styles';

export const MoviesSearch = withStyles(styles)(({ classes, name, handleChange, handleSearch }) => {
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        onChange={handleChange('name')}
        onKeyDown={handleSearch}
        value={name}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
});
