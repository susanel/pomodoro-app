import { StrictMode } from "react";
import { Provider } from "react-redux";

import { ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import { theme } from "./theme";

// component rerenders in Strict Mode for React 18 -> data gets fetched twice!
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

// createRoot(document.getElementById("root")!).render(
//   <Provider store={store}>
//     <ThemeProvider theme={theme}>
//       <App />
//       <TestComponent />
//     </ThemeProvider>
//   </Provider>
// );
