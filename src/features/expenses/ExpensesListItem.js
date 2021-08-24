import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { update, remove } from './expensesSlice'

import styles from './ExpensesListItem.module.css';

export function ExpensesListItem(props) {
    const dispatch = useDispatch();

    const [isEditing, setIsEdition] = useState({
        status: false,
        key: null,
    });

    const [unitPrice, setUnitPrice] = useState(false);

    /**
     *
     * @param id - The id of the item
     * @param currentUnitPrice - The current unit price of the product
     */
    const onEdit = ({id, currentUnitPrice}) => {
        setIsEdition({
            status: true,
            key: id
        })
        setUnitPrice(currentUnitPrice);
    }

    // button handler
    function editingHandler() {
        const currentState = setIsEdition.status;
        // reset the inEditMode state value
        setIsEdition({
            status: !currentState,
            rowKey: null
        })
        // reset the unit price state value
        setUnitPrice(null);
    }

    function cancelEditingHandler() {
        // reset the inEditMode state value
        setIsEdition({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setUnitPrice(null);
    }

    function saveHandler({id, newUnitPrice}) {
        dispatch( update({id, newUnitPrice}) );
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
            <td>{props.item.description}</td>
            <td>
                {props.item.amount}
            </td>
            <td>
                {
                    isEditing.status ? (
                        <input
                            value={unitPrice}
                            onChange={(event) => setUnitPrice(event.target.value)}
                        />
                    ) : (
                        props.item.price
                    )
                }
            </td>
            <td>{(props.item.price * 0.15).toFixed(2)}</td>
            <td>{props.item.date} at {convertTime(props.item.time)}</td>
            <td className={styles.actions}>
                <div>
                    {isEditing.status
                        ? 
                        <>
                            <button
                                className="btn"
                                type="submit"
                                onClick={() => saveHandler({id:props.item.id, newUnitPrice: unitPrice })}
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
