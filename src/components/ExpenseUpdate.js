import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateExpenses } from "../redux/expenseSlice";

const ExpenseUpdate = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const expenseList = useSelector((state) => state.expenses.expenseItem);
    const darkTheme = useSelector((state) => state.expenses.darkTheme);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await axios
                .patch(
                    `https://expense-tracker-2eef1-default-rtdb.firebaseio.com/expenses/${id}.json`,
                    {
                        amount: amount,
                        description: description,
                        category: category,
                    },
                )
                .then(() => {
                    dispatch(updateExpenses({
                        id: id,
                        amount: amount,
                        description: description,
                        category: category,
                    }))
                    console.log("Expense successfuly updated");
                });

            setAmount("");
            setDescription("");
            setCategory("");

            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getExpense = expenseList.flat();
        const expense = getExpense.find((item) => item.id === id);

        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
    }, []);

    return (
        <div className={`my-10 ${darkTheme && `w-full h-screen bg-black`}`}>
            <h1 className="font-semibold text-center text-3xl mb-10">
                Update Expense
            </h1>
            <form onSubmit={submitHandler}>
                <div className="flex justify-center items-center">
                    <div className="mr-10">
                        <label className={`text-2xl ${darkTheme && `text-white`}`}>Amount: </label>
                        <input
                            className="outline-none h-8 px-2 border rounded-sm border-slate-900 ml-5"
                            type="number"
                            value={amount}
                            required
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="mr-10">
                        <label className={`text-2xl ${darkTheme && `text-white`}`}>Description :</label>
                        <input
                            className="outline-none h-8 px-2 border rounded-sm border-slate-900 ml-5"
                            type="text"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mr-10">
                        <label className={`text-2xl ${darkTheme && `text-white`}`}>Category :</label>
                        <select
                            value={category}
                            className="h-8 ml-5 text-center"
                            required
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Food">Food</option>
                            <option value="Fuel">Fuel</option>
                            <option value="Salary">Salary</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-300"
                    >
                        Update Expense
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseUpdate;