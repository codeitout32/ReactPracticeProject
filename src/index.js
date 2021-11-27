import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./contexts/AuthContext";

//Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
//// import * as serviceWorker from "./components/redux/serviceWorker";
import configureStore from "./components/redux/stores/store";
import store from "./store";

//Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

// const store = createStore(
//   reducer
// )

// const store = configureStore();

ReactDOM.render(
  <UserProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </UserProvider>,
  document.getElementById("root")
);

// serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
