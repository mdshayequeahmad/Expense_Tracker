import React from 'react';
import { useSelector } from 'react-redux';

const DownloadExpenses = () => {

    const expenseItem = useSelector((state) => state.expenses.expenseItem);

    const downloadExpensesHandler = () => {
        const expense = expenseItem.flat().map((item) => (
            "Rs: " + item.amount + "   " + item.description + "   " + item.category + "\n"
        ));

        const blob = new Blob([expense], { type: 'text/csv' });
        const file = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = 'expenses.csv';
        a.href = file;
        a.click();
    };

    return (
        <div className='flex justify-end'>
            <div className='my-5 mx-40'>
                <button
                    onClick={downloadExpensesHandler}
                    className='bg-teal-400 text-white px-3 py-2 rounded-lg hover:bg-teal-300'
                >
                    Download Expenses
                </button>
            </div>
        </div>
    )
}

export default DownloadExpenses;