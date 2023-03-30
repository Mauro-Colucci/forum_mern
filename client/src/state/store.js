import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage };
/*const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});*/
const persistedReducer = persistReducer(persistConfig, authReducer);
//const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
