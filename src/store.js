import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";

//Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//Saga
import createSagaMiddleware from "@redux-saga/core";
import { helloSaga } from "./saga/sagas";

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Saga
const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(helloSaga);

//Persist
export let persistor = persistStore(store);

export default store;
