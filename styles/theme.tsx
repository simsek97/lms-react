import { createTheme } from '@mui/material/styles';

export const variants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, type: 'spring', duration: 1 }
  },
  hidden: { opacity: 0, scale: 0 }
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#a4c521'
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ee3f6c'
    }
  }
});
