import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import expireReducer from "redux-persist-expire";
import { expireTime, AUTH } from "./init";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    expireReducer("auth", {
      expireSeconds: expireTime,
      autoExpire: true,
      expiredState: AUTH,
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
