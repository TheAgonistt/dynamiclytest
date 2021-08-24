import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { update, remove } from './expensesSlice'

import styles from './ExpensesListItem.module.css';

export function ExpensesListItem(props) {
    const dispatch = useDispatch();

    const [isEditing, setIsEdition] = useState({
        status: false,
    });

    const [txtDescription, setTxtDescription] = useState(false);
    const [unitPrice, setUnitPrice] = useState(false);
    const [unitAmount, setUnitAmount] = useState(false);

    // button handler
    function editingHandler() {
        const currentState = setIsEdition.status;
        // reset the inEditMode state value
        setIsEdition({
            status: !currentState,
        })

        // reset the unit price state value
        setTxtDescription(null);
        setUnitAmount(null);
        setUnitPrice(null);
    }

    function cancelEditingHandler() {
        // reset the inEditMode state value
        setIsEdition({
            status: false,
        })
        // reset the unit price state value
        setTxtDescription(null);
        setUnitAmount(null);
        setUnitPrice(null);
    }

    function saveHandler({id, item}) {
        // dispatch( update({id, newUnitPrice}) );
        dispatch( update({id, ...item}) );
        cancelEditingHandler();
    }

    function deleteHandler({id}) {
        dispatch( remove({id}) );
        cancelEditingHandler();
    }

    // convert unix time to time
    function convertTime(time) {
        const date = new Date(time * 1000);

        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();

        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    return (
        <tr>
            <td>
                {
                    isEditing.status ? (
                        <input
                            value={txtDescription}
                            onChange={(event) => setTxtDescription(event.target.value)}
                        />
                    ) : (
                        props.item.description
                    )
                }
            </td>
            <td>
                {
                    isEditing.status ? (
                        <input
                            value={unitAmount}
                            onChange={(event) => setUnitAmount(event.target.value)}
                        />
                    ) : (
                        props.item.amount
                    )
                }
            </td>
            <td>
                {
                    isEditing.status ? (
                        <input
                            value={unitPrice}
                            onChange={(event) => setUnitPrice(event.target.value)}
                        />
                    ) : (
                        props.item.price + '$'
                    )
                }
            </td>
            <td>{(props.item.price * 0.15).toFixed(2)}$</td>
            <td>{props.item.date} at {convertTime(props.item.time)}</td>
            <td className={styles.actions}>
                <div>
                    {isEditing.status
                        ? 
                        <>
                            <button
                                className="btn"
                                type="submit"
                                onClick={() => saveHandler({
                                    id:props.item.id,
                                    item: {
                                        newTxtDescription: txtDescription,
                                        newUnitPrice: unitPrice,
                                        newUnitAmount: unitAmount
                                    }
                                })}
                            >
                                Save
                            </button>
                            <button className="btn btn-warning" type="submit" onClick={cancelEditingHandler}>Cancel</button>
                            <button className="btn btn-danger" type="submit" onClick={() => deleteHandler({id: props.item.id})}>Delete</button>
                        </>
                        :
                            <button className="btn btn-warning" type="submit" onClick={editingHandler}>
                                Edit
                            </button>
                    }
                </div>
            </td>
        </tr>
    );
}
