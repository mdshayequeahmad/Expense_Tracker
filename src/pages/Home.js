import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import Expenses from '../components/Expenses';
import DownloadExpenses from '../components/DownloadExpenses';
import { useSelector } from 'react-redux';

const Home = () => {
  const darkTheme = useSelector((state) => state.expenses.darkTheme);

  return (
    <div className={`w-full h-screen ${darkTheme && `bg-black`}`}>
      <Header />
      <ExpenseForm />
      <Expenses />
      <DownloadExpenses />
    </div>
  )
}

export default Home;