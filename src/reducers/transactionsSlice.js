import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
    name:'transactions',
    initialState: {
        value: []
    },
    reducers: {
        addTransaction: (state, action) => {
            state.value.push(action.payload);
        },
        clearTransactions: (state) => {
            state.value = []
        },
        modifyTransactions: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const selectAllTransactions = state => state.transactions.value;

export const { addTransaction, clearTransactions, modifyTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer;