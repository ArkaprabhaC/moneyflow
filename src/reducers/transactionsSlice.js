import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
    name:'transactions',
    initialState: {
        items: [],
        totalAmount: 0
    },
    reducers: {
        addTransaction: (state, action) => {
            const payload = action.payload;
            if (payload.transactionType === "expense") {
                state.totalAmount -= payload.amount;
            } else {
                state.totalAmount += payload.amount;
            }
            state.items.push(payload);
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
export const selectTotalAmount = state => state.transactions.totalAmount;

export const { addTransaction, clearTransactions, modifyTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer;