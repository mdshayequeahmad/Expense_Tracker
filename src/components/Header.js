import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, themeChanger } from '../redux/expenseSlice';
import { getAuth, signOut } from "firebase/auth";
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {
    const [totalExpenses, setTotalExpenses] = useState(0);

    const auth = getAuth();
    const user = useSelector((state) => state.expenses.userInfo);
    const expenseItem = useSelector((state) => state.expenses.expenseItem);
    const darkTheme = useSelector((state) => state.expenses.darkTheme);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = () => {
        navigate("/profile");
    };

    const logOutHandler = async () => {
        try {
            await signOut(auth);
            dispatch(removeUser());
            console.log("User logout");
        } catch (error) {
            console.log(error);
        }
    };

    const themeChangeHandler = () => {
        dispatch(themeChanger());
    };

    useEffect(() => {
        let expenses = 0;
        expenseItem.flat().map((item) => (
            expenses += Number(item.amount)
        ));
        setTotalExpenses(expenses);
    }, [expenseItem]);

    return (
        <div>
            <div className='flex justify-between'>
                <div className='mx-4 mt-4'>
                    <h1
                        className={`font-semibold text-2xl ${darkTheme && `text-white`}`}
                    >
                        Welcome to Expense Tracker!!!
                    </h1>
                </div>
                <div className='flex mx-4 mt-4'>
                    <h1
                        className={`font-semibold text-2xl ${darkTheme && `text-white`}`}
                    >
                        Your profile is incomplete:
                    </h1>
                    <button
                        onClick={submitHandler}
                        className={`bg-blue-500 mx-2 px-3 py-2 rounded hover:bg-blue-400`}
                    >
                        Complete now
                    </button>
                    {
                        totalExpenses > 10000 &&
                        <button
                            onClick={themeChangeHandler}
                            className='bg-cyan-400 text-white mr-2 px-3 py-2 rounded-md hover:bg-cyan-300'
                        >
                            Activate Premium
                        </button>
                    }
                    {user && (
                        <button
                            onClick={logOutHandler}
                            className='bg-red-400 px-3 text-white rounded-lg hover:bg-red-300'
                        >
                            <AiOutlineLogout />
                        </button>
                    )}
                </div>
            </div>
            <hr className={`border-black my-5 ${darkTheme && `border-white`}`} />
        </div>
    )
}

export default Header;