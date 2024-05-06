import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer} from "redux-persist";
import { thunk } from "redux-thunk";


import userSlice from "./slices/userSlice"; 
import storage from "redux-persist/lib/storage";

const reducers = combineReducers ({ 
    user: userSlice.reducer,
    // user: userSlice
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

 export default configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
    });