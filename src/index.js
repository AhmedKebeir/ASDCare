import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import WindowWidthContext from "./Context/WindowWidthContext";
import { Provider } from "react-redux";
import { store } from "./store";
import ScrollToTop from "./ScrollToTop";
import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowWidthContext>
      <BrowserRouter>
        <ScrollToTop />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </WindowWidthContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
