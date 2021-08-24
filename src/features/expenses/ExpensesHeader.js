import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  selectTotalPrice,
  selectTotalPriceWithTaxes
} from './expensesSlice';

import styles from './ExpensesHeader.module.css';

export function ExpensesHeader(props) {
  const totalPrice = useSelector(selectTotalPrice);
  const totalPriceWithTaxes = useSelector(selectTotalPriceWithTaxes);
  
  function addHandler() {
    props.addingNewExpense(true);
  }

  return (
    <div>
        <header className={styles.header}>
          <div className={styles.header__col}>
            <p>The sub-total of expenses is <strong>{totalPrice}$</strong></p>
            <p>The total with taxes is <strong>{totalPriceWithTaxes}$</strong></p>
          </div>

          <div className={styles.header__col}>
            <button className="btn" type="button" onClick={addHandler}>Add new expense</button>
          </div>
        </header>
    </div>
  );
}
