import api from "../config/api";
import { Expenses } from "../types";

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

  export const createExpense = (expense: {description: string, date: Date, value: number, category_id: number}) => {
    fetch(`${api}/expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: expense.description, date: expense.date, value: expense.value, category_id: expense.category_id})
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

  export const updateExpense = (expense: {id: number, description: string, date: Date, value: number, category_id: number}) => {
    fetch(`${api}/expense/${expense.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: expense.description, date: expense.date, value: expense.value, category_id: expense.category_id })
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

  export const deleteExpense = (expenseId: number) => {
    fetch(`${api}/expense/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Sem resposta');
        }
        console.log('Excluído com sucesso')
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
