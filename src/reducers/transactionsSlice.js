import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
    name:'transactions',
    initialState: {
        items: []
    },
    reducers: {
        addTransaction: (state, action) => {
            state.items.push(action.payload);
        },
        clearTransactions: (state) => {
            state.items = []
        },
        modifyTransactions: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const selectAllTransactions = state => state.transactions.items;

export const { addTransaction, clearTransactions, modifyTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer;