import api from "../config/api";
import { accountTypes } from "../utils/types";

type Increases = {
    description: string;
    date: Date;
    value: number;
}

export const listIncrease = async () => {
 try {
    const response = await fetch(`${api}/increase`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('GET request failed');
    }

    const increase: Increases[] = await response.json();
    console.log('GET request succeeded');
    console.log('increase:', increase);

    return increase;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

type Expenses = {
    description: string;
    date: Date;
    value: number;
}


  export const listExpense = () => {
    fetch(`${api}/expense`)
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
