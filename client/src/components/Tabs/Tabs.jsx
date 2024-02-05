import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography } from '@mui/material';
import { MovieCreation, Camera } from '@mui/icons-material';
import { Movies } from '../Movies/Movies';
import { Directors } from '../Directors/Directors';
import { withStyles } from '@mui/styles';
import { styles } from './styles';

const TabContainer = ({ children, dir, value, index }) => (
  <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}>
    {children}
  </Typography>
);

export const SimpleTabs = withStyles(styles)(({ classes }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <Tab
            label="Movies"
            icon={<Camera />}
            style={{
              color: value === 0 ? '#fff' : '#212121',
              backgroundColor: value === 1 ? '#fff' : 'transparent',
            }}
          />
          <Tab
            label="Directors"
            icon={<MovieCreation />}
            style={{
              color: value === 1 ? '#fff' : '#212121',
              backgroundColor: value === 0 ? '#fff' : 'transparent',
            }}
          />
        </Tabs>
      </AppBar>
      <TabContainer value={value} index={0}>
        <Movies />
      </TabContainer>
      <TabContainer value={value} index={1}>
        <Directors />
      </TabContainer>
    </div>
  );
});
