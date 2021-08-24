import React from 'react';
import { Expenses } from './features/expenses/Expenses';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="c-Header">
          <h1>Expense tracker</h1>
        </header>

        <Expenses />
      </div>
    </div>
  );
}

export default App;
