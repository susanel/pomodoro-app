import { StrictMode } from "react";
import { Provider } from "react-redux";

import { ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
