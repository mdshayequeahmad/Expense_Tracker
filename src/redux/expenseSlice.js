import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    expenseItem: [],
}

export const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = null;
        },
        addExpenses: (state, action) => {
            state.expenseItem.push(action.payload);
        },
        deleteExpenses: (state, action) => {
            state.expenseItem = state.expenseItem.filter(
                (item) => item.id !== action.payload
            );
        },
        updateExpenses: (state, action) => {
            const item = state.expenseItem.flat().find(
                (item) => item.id === action.payload.id
            );
            if (item) {
                item.amount = action.payload.amount
                item.description = action.payload.description
                item.category = action.payload.category
            }
        },
    },
});

export const { addUser, removeUser, addExpenses, deleteExpenses, updateExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;