import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/profile");
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
        </div>
      </div>
      <hr className=' border-black my-5' />
    </div>
  )
}

export default Home;