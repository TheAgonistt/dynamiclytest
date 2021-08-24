import { createSlice, current } from '@reduxjs/toolkit'

const DUMMY_DATA = [
    {
        id: 1,
        description: 'Pencils',
        amount: 5,
        price: 1,
        date: '2021-08-23',
        time: Date.now(),
    },
    {
        id: 2,
        description: 'Erasers',
        amount: 10,
        price: 3,
        date: '2021-08-22',
        time: Date.now(),
    },
    {
        id: 3,
        description: 'Fruits',
        amount: 21,
        price: 10,
        date: '2021-08-21',
        time: Date.now(),
    }
]

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        value: DUMMY_DATA,
    },
    reducers: {
        add(state, action) {
            const s = current(state);

            return {s, value: [...s.value, action.payload] };
        },

        update(state, action) {
            const s = current(state);
            const payload = action.payload;
            const id = action.payload.id;

            const newDescription = payload.newTxtDescription ? payload.newTxtDescription : null;
            const newAmount = payload.newUnitAmount ? parseInt(payload.newUnitAmount) : null;
            const newPrice = payload.newUnitPrice ? parseInt(payload.newUnitPrice) : null;


            const index = s.value.findIndex(item => item.id === id);
            const updated = {...s.value[index] };

            if (newDescription) {
                updated.description = newDescription;
            }

            if (newAmount) {
                updated.amount = newAmount;
            }

            if (newPrice) {
                updated.price = newPrice;
            }

            return {
                s,
                value: [
                    ...s.value.slice(0, index),
                    updated,
                    ...s.value.slice(index + 1),
                ]
            };
        },

        remove: (state, action) => {
            const s = current(state);
            const id = action.payload.id;
            const index = s.value.findIndex(item => item.id === id);

            return {
                s,
                value: [
                    ...s.value.slice(0, index),
                    ...s.value.slice(index + 1),
                ]
            };
        },
    },
})

// Action creators are generated for each case reducer function
export const { add, update, remove } = expensesSlice.actions

// The function below is called a selector and allows us to select a value from
// the state.
export const selectExpenses = (state) => state.expenses.value;
export const selectTotalPrice = (state) => {
    return state.expenses.value.reduce((accumulator, currentValue) => { return accumulator + currentValue.price}, 0)
};
export const selectTotalPriceWithTaxes = (state) => {
    return state.expenses.value
        .reduce((accumulator, currentValue) => {
            const total = accumulator + currentValue.price + (currentValue.price * 0.15);
            console.log('total: ', total);
            return total;
        }, 0)
};

export default expensesSlice.reducer