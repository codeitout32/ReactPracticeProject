import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";
import logger from "redux-logger";

//Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//Saga
import createSagaMiddleware from "@redux-saga/core";
import { fetchLists } from "./saga/sagas";
import rootSaga from "./saga";

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Saga
const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware, logger];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

//Persist
export let persistor = persistStore(store);

export default store;
