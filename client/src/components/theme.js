import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

export default createTheme({
  typography: {
    useNextVariants: true,
    color: '#fff',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#E535AB'
    },
    secondary: blue,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    contrastText: '#fff',
  },
  spacing: factor => `${0.25 * factor}rem`,
});
