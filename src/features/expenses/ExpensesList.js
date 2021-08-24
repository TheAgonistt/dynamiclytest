import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ExpensesListItem } from './ExpensesListItem';
import {
    selectExpenses,
} from './expensesSlice';

import styles from './ExpensesList.module.css';

export function ExpensesList() {
    const expenses = useSelector(selectExpenses);

    return (
        <div>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Taxes (15%)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map(expense => (
                            <ExpensesListItem key={expense.id} item={expense} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
