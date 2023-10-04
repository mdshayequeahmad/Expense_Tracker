import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses, deleteExpenses } from "../redux/expenseSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const Expenses = () => {
    const [expense, setExpense] = useState([]);

    const dispatch = useDispatch();
    const darkTheme = useSelector((state) => state.expenses.darkTheme);
    const user = useSelector((state) => state.expenses.userInfo);
    const {_id} = user;

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetch(`https://expense-tracker-2eef1-default-rtdb.firebaseio.com/${_id}/expenses.json`);
                const data = await result.json();

                const newData = [];

                for (const key in data) {
                    newData.push({
                        id: key,
                        amount: data[key].amount,
                        description: data[key].description,
                        category: data[key].category
                    })
                }

                setExpense(newData);

                dispatch(addExpenses(newData));

            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, [expense]);

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`https://expense-tracker-2eef1-default-rtdb.firebaseio.com/${_id}/expenses/${id}.json`)
                .then(() => {
                    dispatch(deleteExpenses(id))
                    console.log("Expense successfuly deleted");
                })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="mt-10">
            <h1 className={`font-semibold text-3xl text-center mb-5 ${darkTheme && `text-white`}`}>Expenses</h1>
            {expense.map((item) => (
                <div key={item.id}>
                    <div className="mx-40 px-4 bg-slate-200 rounded-md">
                        <p
                            className="flex justify-between items-center text-lg h-12 font-semibold"
                        >
                            <span>Rs: {item.amount}</span>
                            <span className="">{item.description}</span>
                            <span>
                                {item.category}
                                <Link to={`update/${item.id}`}>
                                    <button
                                        className="bg-amber-500 px-3 py-1 text-white rounded-lg ml-5 hover:bg-amber-300"
                                    >
                                        Update
                                    </button>
                                </Link>
                                <button
                                    onClick={() => deleteHandler(item.id)}
                                    className="bg-red-500 px-3 py-1 text-white rounded-lg ml-5 hover:bg-red-400"
                                >
                                    Delete
                                </button>
                            </span>
                        </p>
                    </div>
                    <div className="h-1" />
                </div>
            ))}
        </div>
    );
};

export default Expenses;
