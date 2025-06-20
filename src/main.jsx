import React from "react";
import ReactDOM from "react-dom/client";
import { store} from "./redux/store"; // Import Redux store
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <ThemeProvider>
        <App />
        </ThemeProvider>
        
    </Provider>
);