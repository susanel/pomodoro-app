import { createTheme } from "@mui/material";

// declare additional props that Icon Button doesn't have
declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "contained" | "outlined";
  }
} // czy to dziala poniewaz interface jest rozszerzony a inne propsy sa zadeklarowane w innym miejscu (bibliotece MUI)?

declare module "@mui/material" {
  interface PaletteOptions {
    pomodoro?: {
      red: string;
      green: string;
      blue: string;
    };
  }
  interface Palette {
    pomodoro?: {
      red: string;
      green: string;
      blue: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const baseTheme = createTheme({
  palette: {
    pomodoro: {
      red: "rgb(186, 73, 73)",
      green: "rgb(56, 133, 138)",
      blue: "rgb(57, 112, 151)",
    },
  },
  typography: {
    fontFamily: "Nunito, -apple-system, sans-serif",
  },
});

export const theme = createTheme(baseTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          fontSize: "16px",
          variants: [
            {
              props: { variant: "contained", color: "primary" },
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                opacity: "0.9",
                textTransform: "none",
                "&:hover": {
                  boxShadow: "none",
                  opacity: 1,
                },
              },
            },
            {
              props: { variant: "contained", color: "secondary" },
              style: {
                backgroundColor: "rgba(0, 0, 0, 0.15)",
                fontWeight: 700,
                padding: "2px 12px",
                textTransform: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              },
            },
            {
              props: { variant: "contained", color: "tertiary" },
              style: {
                backgroundColor: "white",
                fontWeight: 700,
                padding: "2px 12px",
                color: baseTheme.palette.pomodoro!.red, // Zadeklarowalam pomodro jako prop opcjonalny, moze zmienic aby nie bylo niepotrzebnego bledu i koniecznosci uzywania: !
                boxShadow: "rgb(235,235,235) 0px 6px 0px",
                "&:hover": {
                  boxShadow: "rgb(235,235,235) 0px 6px 0px",
                },
              },
            },
            {
              props: { variant: "text", color: "primary" },
              style: {
                color: "white",
                opacity: "0.9",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0)",
                },
              },
            },
            {
              props: { variant: "dashed" },
              style: {
                border: "2px dashed rgba(255, 255, 255, 0.4)",
                borderRadius: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                color: "white",
                fontWeight: "700",
                opacity: "0.8",
                textTransform: "none",
                marginTop: "12px",
                "&:hover": {
                  opacity: "1",
                },
              },
            },
          ],
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "contained" },
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "4px",
                color: "white",
                opacity: "0.9",
                "&:hover": {
                  opacity: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            },
            {
              props: { variant: "outlined" },
              style: {
                border: "1px solid rgb(223, 223, 223)",
                borderRadius: "4px",
                color: "#868686",
              },
            },
          ],
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: "3px",
          borderRadius: "100px",
          "&::before": {
            top: "1px",
            height: "1px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            opacity: 1,
          },
        },
        bar: {
          height: "3px",
          borderRadius: "inherit",
          backgroundColor: "white",
        },
      },
    },
  },
});
