import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cmn from "./cmn";

var rootReducer = combineReducers({
  // add multiple reducers here
  cmn: cmn,
  
});



//pass the persist config and the root reducer to the `persist reducer`
//const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
