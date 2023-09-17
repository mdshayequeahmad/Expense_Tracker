import React, { useEffect, useState } from "react";

const Expenses = () => {
    const [expense, setExpense] = useState([]);

    const getData = async () => {
        const result = await fetch("https://expense-tracker-2eef1-default-rtdb.firebaseio.com/expenses.json");
        if (!result.ok) {
            throw new Error('Something went wrong')
        }
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

    };

    useEffect(() => {
        getData();
    }, [expense]);

    return (
        <div className="mt-10">
            <h1 className="font-semibold text-3xl text-center mb-5">Expenses</h1>
            {expense.map((item) => (
                <div key={item.id}>
                    <div className="mx-40 px-4 bg-slate-200 rounded-md">
                        <p
                            className="flex justify-between items-center text-lg h-12 font-semibold"
                        >
                            <span>Rs: {item.amount}</span>
                            <span className="">{item.description}</span>
                            <span>{item.category}</span>
                        </p>
                    </div>
                    <div className="h-1" />
                </div>
            ))}
        </div>
    );
};

export default Expenses;
