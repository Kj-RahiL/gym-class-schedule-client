import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
// import registerSlice from "./features/user/registerSlice";
import authSlice from "./features/Auth/authSlice";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
const persistConfig = {
    key: 'auth',
    storage
}
const persistedAuthReducer = persistReducer(persistConfig, authSlice)
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // register: registerSlice,
    auth: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck:{
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],  
        }
    }).concat(baseApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

