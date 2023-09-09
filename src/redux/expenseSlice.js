import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
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
        }
    },
});

export const { addUser, removeUser } = expensesSlice.actions;
export default expensesSlice.reducer;