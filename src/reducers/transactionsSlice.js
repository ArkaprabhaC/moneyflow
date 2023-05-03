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
            state.totalAmount += payload.amount;
            state.items.push(payload);
        },
        clearTransactions: (state) => {
            state.items = [];
            state.totalAmount = 0;
        },
        modifyTransactionById: (state, action) => {
            const {itemId, editedItem} = action.payload;
            const itemIndex = state.items.findIndex((transaction) => transaction.id === itemId );
            state.items.splice(itemIndex, 1, editedItem);
            state.totalAmount = 0;
            state.items.forEach(item => state.totalAmount += item.amount);
        },
        deleteTransactionById: (state, action) => {
            const itemId = action.payload;
            const itemIndex = state.items.findIndex((transaction) => transaction.id === itemId );
            state.items.splice(itemIndex, 1);
            state.totalAmount = 0;
            state.items.forEach(item => state.totalAmount += item.amount);
        }
    }
});

export const selectAllTransactions = state => state.transactions.items;
export const selectTotalAmount = state => state.transactions.totalAmount;

export const { addTransaction, clearTransactions, modifyTransactionById, deleteTransactionById } = transactionsSlice.actions
export default transactionsSlice.reducer;