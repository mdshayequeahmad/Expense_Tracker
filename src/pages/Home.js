import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import Expenses from '../components/Expenses';

const Home = () => {

  return (
    <div>
      <Header />
      <ExpenseForm />
      <Expenses />
    </div>
  )
}

export default Home;