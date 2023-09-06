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
        }
    },
});

export const { addUser } = expensesSlice.actions;
export default expensesSlice.reducer;