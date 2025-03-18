import React, { useState, useEffect } from "react";
import "./ExpenseTracker.css";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!amount || !category || !date) return;
    const newExpense = { id: Date.now(), amount: parseFloat(amount), category, date };
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setCategory("");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpense = expenses.reduce((total, exp) => total + exp.amount, 0);

  return (
    <div className="expense-tracker container">
      <h2>Expense Tracker</h2>
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <h3 className="total-expense">Total: Rs {totalExpense.toFixed(2)}</h3>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <span className="expense-content">
              Rs {expense.amount.toFixed(2)} - {expense.category} ({expense.date})
            </span>
            <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
