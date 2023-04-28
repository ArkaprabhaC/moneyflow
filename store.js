import { configureStore } from "@reduxjs/toolkit";
import transactions from "./src/reducers/transactionsSlice";

export default configureStore({
    reducer: {
        transactions
    }
});