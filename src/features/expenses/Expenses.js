import React, { useState } from 'react';

import { ExpensesHeader } from './ExpensesHeader';
import { ExpensesAdd } from './ExpensesAdd';
import { ExpensesList } from './ExpensesList';

export function Expenses() {
  const [addingNewExpense, setNewExpense] = useState(false);

  return (
    <div>
      <ExpensesHeader addingNewExpense={setNewExpense} />
      {addingNewExpense
        ? <ExpensesAdd addingNewExpense={setNewExpense} />
        : null
      }
      <ExpensesList />
    </div>
  );
}
