import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/expenseSlice';
import { getAuth, signOut } from "firebase/auth";
import { AiOutlineLogout } from "react-icons/ai";
import ExpenseForm from '../components/ExpenseForm';
import Expenses from '../components/Expenses';

const Home = () => {

  const auth = getAuth();
  const user = useSelector((state) => state.expenses.userInfo)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = () => {
    navigate("/profile");
  };

  const logOutHandler = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      console.log("User logout");
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <div className='flex justify-between'>
        <div className='mx-4 mt-4'>
          <h1 className='font-semibold text-2xl'>Welcome to Expense Tracker!!!</h1>
        </div>
        <div className='flex mx-4 mt-4'>
          <h1 className='font-semibold text-1xl'>Your profile is incomplete: </h1>
          <button
            onClick={submitHandler}
            className='bg-blue-500 mx-2 px-2 rounded hover:bg-blue-400'
          >
            Complete now
          </button>

          {user && (
            <button
              onClick={logOutHandler}
              className='bg-red-400 px-2 text-white rounded-lg hover:bg-red-300'
            >
              <AiOutlineLogout />
            </button>
          )}
        </div>
      </div>
      <hr className=' border-black my-5' />

      <ExpenseForm />

      <Expenses />
    </div>
  )
}

export default Home;