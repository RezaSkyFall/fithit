import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  Theme,
  ThemeProvider,
} from "@mui/material";
import { createContext, useMemo, useState } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const AppTheme = ({ children }: any) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const ambient = [
    "0px 0px 0px 0px",
    "0px 1px 3px 0px",
    "0px 1px 5px 0px",
    "0px 1px 8px 0px",
    "0px 1px 10px 0px",
    "0px 1px 14px 0px",
    "0px 1px 18px 0px",
    "0px 2px 16px 1px",
    "0px 3px 14px 2px",
    "0px 3px 16px 2px",
    "0px 4px 18px 3px",
    "0px 4px 20px 3px",
    "0px 5px 22px 4px",
    "0px 5px 24px 4px",
    "0px 5px 26px 4px",
    "0px 6px 28px 5px",
    "0px 6px 30px 5px",
    "0px 6px 32px 5px",
    "0px 7px 34px 6px",
    "0px 7px 36px 6px",
    "0px 8px 38px 7px",
    "0px 8px 40px 7px",
    "0px 8px 42px 7px",
    "0px 9px 44px 8px",
    "0px 9px 46px 8px",
  ];
  const theme: Theme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        palette: {
          primary: {
            main: mode == "dark" ? "#5B43EA" : "#5B43EA",
            contrastText: "#fff",
          },
          secondary: { main: "#00DEB7", contrastText: "#fff" },
          mode: mode,
          text: {
            secondary: mode == "dark" ? "#BBC" : "#687076",
          },
          background: {
            default: mode == "dark" ? "#1C1C1C" : "#F8F9FA",
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: "iranyekan",
          button: { fontWeight: "bold" },
          h1: { fontSize: 42 },
          h2: { fontSize: 38 },
          h3: { fontSize: 36 },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'iranyekan';
              font-style: normal;
              src:url('/fonts/iranyekan/eot/iranyekanwebregular(fanum).eot');
              src:url('/fonts/iranyekan/woff/iranyekanwebregular(fanum).woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
              url('/fonts/iranyekan/ttf/iranyekanwebregular(fanum).ttf') format('truetype'),
              url('/fonts/iranyekan/woff2/iranyekanwebregular(fanum).woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
              url('/fonts/iranyekan/eot/iranyekanwebregular(fanum).eot?#iefix') format('embedded-opentype')  /* IE6-8 */;
              font-weight: normal;
            
            }
            /* iranyekan - light */
            @font-face {
              font-family: 'iranyekan';
              font-style: normal;
              src: url('/fonts/iranyekan/eot/iranyekanweblight(fanum).eot');
              src: url('/fonts/iranyekan/eot/iranyekanweblight(fanum).eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
                url('/fonts/iranyekan/woff2/iranyekanweblight(fanum).woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
                url('/fonts/iranyekan/woff/iranyekanweblight(fanum).woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
                url('/fonts/iranyekan/ttf/iranyekanweblight(fanum).ttf') format('truetype');
              font-weight: 300;
            }
            /* iranyekan - bold */
            @font-face {
              font-family: 'iranyekan';
              font-style: normal;
              src: url('/fonts/iranyekan/eot/iranyekanwebbold(fanum).eot');
              src: url('/fonts/iranyekan/eot/iranyekanwebbold(fanum).eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
                url('/fonts/iranyekan/woff2/iranyekanwebbold(fanum).woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
                url('/fonts/iranyekan/woff/iranyekanwebbold(fanum).woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
                url('/fonts/iranyekan/ttf/iranyekanwebbold(fanum).ttf') format('truetype');
              font-weight: bold;
            }
          
           
          :root {
            color-scheme: ${mode};
          }
            `,
          },
        },
        shadows: ambient.map((item) => item + " rgb(0 0 0 / 10%)") as any,
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppTheme;
export { ColorModeContext };
