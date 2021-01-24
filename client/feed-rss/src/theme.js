import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0C2C52',
    },
    secondary: {
      main: '#5E9DC8',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    }
  },
});

export default theme;