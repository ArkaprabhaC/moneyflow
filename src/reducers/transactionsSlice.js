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
            const payload = action.payload;
            state.items = payload;
            state.totalAmount = 0;
            payload.map(item => {
                if (item.transactionType === "expense") {
                    state.totalAmount -= item.amount;
                } else {
                    state.totalAmount += item.amount;
                }
            })
        }
    }
});

export const selectAllTransactions = state => state.transactions.items;
export const selectTotalAmount = state => state.transactions.totalAmount;

export const { addTransaction, clearTransactions, modifyTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer;