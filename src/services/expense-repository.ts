import api from "../config/api";
import { Expenses } from "../types/increase";

export const listExpense = async () => {
  try {
     const response = await fetch(`${api}/expense`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     });
 
     if (!response.ok) {
       throw new Error('GET falhou');
     }
     const expense: Expenses[] = await response.json();
     console.log('expense:', expense);
 
     return expense;
   } catch (error) {
     console.error('Error:', error);
     return [];
   }
 }

  export const getExpenseById = (expenseId: number) => {
    fetch(`${api}/expense/${expenseId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Sem resposta');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  export const createExpense = (expense: {date: Date, value: number}) => {
    fetch(`${api}/expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  date: expense.date, value: expense.value})
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Sem resposta');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  export const updateExpense = (expense: {date: Date, value: number}) => {
    fetch(`${api}/expense`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: expense.date, value: expense.value })
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Sem resposta');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  export const deleteExpense = (expense: {date: Date, value: number}) => {
    fetch(`${api}/expense`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: expense.date, value: expense.value })
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Sem resposta');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
