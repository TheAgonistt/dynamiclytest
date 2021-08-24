import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { add, remove } from './expensesSlice'

import styles from './ExpensesAdd.module.css';

export function ExpensesAdd(props) {
    const dispatch = useDispatch()

    // cancel handler for cancle button
    function cancelHandler() {
        props.addingNewExpense(false);
    }

    // html input element
    const descriptionInputRef = useRef();
    const amountInputRef = useRef();
    const priceInputRef = useRef();
    const dateInputRef = useRef();

    // front end validation 
    function submitHandler(event) {
        event.preventDefault();
        
        // get the inputs values
        const description = descriptionInputRef.current.value;
        const amount = amountInputRef.current.value;
        const price = priceInputRef.current.value;
        const date = dateInputRef.current.value;
        const time = Date.now();

        if (description && amount && price) {
            // build an expense object
            const id = Math.floor(Math.random(1,1000) * 1000);
            const taxes = price * 0.15;
            const expense = {id, description, amount, price, taxes, date, time};
            
            dispatch(add(expense));
            props.addingNewExpense(false);

            return
        }
    }

    return (
        <div>
            <form className={styles.form} onSubmit={submitHandler}>
                <h2 className={styles.intro}>Adding new item</h2>

                <div className={styles.control}>
                    <label htmlFor="desciption">Description</label>
                    <input type="text" required id="desciption" ref={descriptionInputRef} />
                </div>

                <div className={styles.control}>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" required id="amount"  ref={amountInputRef} />
                </div>

                <div className={styles.control}>
                    <label htmlFor="price">Price</label>
                    <input type="number" required id="price"  ref={priceInputRef} />
                </div>

                <div className={styles.control}>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date"  ref={dateInputRef} />
                </div>

                <div className={styles.actions}>
                    <button className="btn" type="submit">Add new item</button>
                    <button className="btn btn-danger" type="submit" onClick={cancelHandler}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
