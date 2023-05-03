import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./src/reducers/transactionsSlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import FilesystemStorage from "redux-persist-filesystem-storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";


const persistConfig = {
    key: 'root',
    storage: FilesystemStorage,
    stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, transactionReducer);
export const store = configureStore({
    reducer: {
        transactions: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
export const persistor = persistStore(store);
