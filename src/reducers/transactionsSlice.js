import { createSlice } from "@reduxjs/toolkit";

const INCOME = "income";
const EXPENSE = "expense";

const addIncomeExpenseAmount = (state, item) => {
    state.cashInHandAmount += item.amount;
    if( item.transactionType === INCOME) {
        state.totalIncomeAmount += item.amount;
    } else if ( item.transactionType === EXPENSE ) {
        state.totalExpenseAmount += item.amount;
    }
}

const resetAmounts = (state) => {
    state.cashInHandAmount = 0;
    state.totalIncomeAmount = 0;
    state.totalExpenseAmount = 0;
}

const recalculateAmounts = (state) => {
    resetAmounts(state);
    state.items.forEach(item => { 
        addIncomeExpenseAmount(state, item);
    });
}

const findItemIndex = (items, itemId) => {
    return items.findIndex((transaction) => transaction.id === itemId );
}

export const transactionsSlice = createSlice({
    name:'transactions',
    initialState: {
        items: [],
        cashInHandAmount: 0,
        totalIncomeAmount: 0,
        totalExpenseAmount: 0
    },
    reducers: {
        addTransaction: (state, action) => {
            const payload = action.payload;
            state.items.push(payload);
            addIncomeExpenseAmount(state, payload);
        },
        clearTransactions: (state) => {
            state.items = [];
            resetAmounts(state);
        },
        modifyTransactionById: (state, action) => {
            const {itemId, editedItem} = action.payload;
            const itemIndex = findItemIndex(state.items, itemId);
            state.items.splice(itemIndex, 1, editedItem);
            recalculateAmounts(state);

        },
        deleteTransactionById: (state, action) => {
            const itemId = action.payload;
            const itemIndex = findItemIndex(state.items, itemId);
            state.items.splice(itemIndex, 1);
            recalculateAmounts(state);
        }
    }
});

export const selectAllTransactions = state => state.transactions.items;
export const selectCashInHandAmount = state => state.transactions.cashInHandAmount;
export const selectIncomeAmount = state => state.transactions.totalIncomeAmount;
export const selectExpenseAmount = state => state.transactions.totalExpenseAmount;

export const { addTransaction, clearTransactions, modifyTransactionById, deleteTransactionById } = transactionsSlice.actions
export default transactionsSlice.reducer;