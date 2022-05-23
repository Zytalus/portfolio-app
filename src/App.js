// Import React
import * as React from 'react';
// Import MUI Styles
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Import MUI Components
import { useMediaQuery, CssBaseline } from '@mui/material';
// Import App Components
import Drawer from './components/Drawer';
import { BrowserRouter } from "react-router-dom";

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <Drawer colorMode={colorMode} />
    </>
  );
}

export default function ToggleColorMode() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
