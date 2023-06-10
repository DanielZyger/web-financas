import api from "../config/api";
import { Invests } from "../types";

export const listInvest = async () => {
  try {
     const response = await fetch(`${api}/invest`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     });
 
     if (!response.ok) {
       throw new Error('GET falhou');
     }
     const invest: Invests[] = await response.json();
     console.log('invest:', invest);
 
     return invest;
   } catch (error) {
     console.error('Error:', error);
     return [];
   }
 }

  export const getInvestById = (investId: number) => {
    fetch(`${api}/invest/${investId}`)
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

  export const createInvest = (invest: {goal: number, percentage: number, date: Date, value: number}) => {
    fetch(`${api}/invest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal: invest.goal, percentage: invest.percentage , date: invest.date, value: invest.value})
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

  export const updateInvest = (invest: {goal: number, percentage: number, date: Date, value: number}) => {
    fetch(`${api}/invest`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal: invest.goal, percentage: invest.percentage, date: invest.date, value: invest.value })
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

  export const deleteInvest = (invest: {goal: number, percentage: number, date: Date, value: number}) => {
    fetch(`${api}/invest`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal: invest.goal, percentage: invest.percentage, date: invest.date, value: invest.value })
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
