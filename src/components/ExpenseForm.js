import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ExpenseForm = () => {

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const darkTheme = useSelector((state) => state.expenses.darkTheme);
    const user = useSelector((state) => state.expenses.userInfo);
    const { _id } = user;

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`https://expense-tracker-2eef1-default-rtdb.firebaseio.com/${_id}/expenses.json`, {
                amount: amount,
                description: description,
                category: category
            });
            console.log(res.data);

            setAmount("");
            setDescription("");
            setCategory("");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='my-10'>
            <form onSubmit={submitHandler}>
                <div className='flex justify-center items-center'>
                    <div className='mr-10'>
                        <label className={`text-2xl ${darkTheme && `text-white`}`}>Amount: </label>
                        <input
                            className='outline-none h-8 px-2 border rounded-sm border-slate-900 ml-5'
                            type="number"
                            value={amount}
                            required
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className='mr-10'>
                        <label className={`text-2xl ${darkTheme && `text-white`}`}>Description :</label>
                        <input
                            className='outline-none h-8 px-2 border rounded-sm border-slate-900 ml-5'
                            type="text"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='mr-10'>
                        <label className={`text-2xl ${darkTheme && `text-white`}`}>Category :</label>
                        <select
                            value={category}
                            className='h-8 ml-5 text-center'
                            required
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Choose Category</option>
                            <option value="Food">Food</option>
                            <option value="Fuel">Fuel</option>
                            <option value="Salary">Salary</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-300'
                    >
                        Daily Expenses
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ExpenseForm;