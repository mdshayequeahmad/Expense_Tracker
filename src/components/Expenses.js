import React from 'react';
import { useSelector } from 'react-redux';

const Expenses = () => {
    const expenseItem = useSelector((state) => state.expenses.expenseItem);

    return (
        <div className='mt-10'>
            <h1 className='font-semibold text-3xl text-center mb-5'>Expenses</h1>
            {expenseItem.map((item, i) => (
                <div>
                    <div className='mx-40 px-4 bg-slate-200 rounded-md'>
                        <p key={i} className='flex justify-between items-center text-lg h-12 font-semibold'>
                            <span>Rs: {item.amount}</span>
                            <span className=''>{item.description}</span>
                            <span>{item.category}</span>
                        </p>
                    </div>
                    <div className='h-1' />
                </div>
            ))}
        </div>
    )
}

export default Expenses;