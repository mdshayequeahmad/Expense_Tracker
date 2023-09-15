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
        }
    },
});

export const { addUser, removeUser, addExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;