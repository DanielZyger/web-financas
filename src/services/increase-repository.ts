import api from "../config/api";
import { Increases } from "../types/increase";

export const listIncrease = async () => {
 try {
    const response = await fetch(`${api}/increase`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('GET falhou');
    }
    const increase: Increases[] = await response.json();
    console.log('increase:', increase);

    return increase;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const getincreaseById = (id: number) => {
  fetch(`${api}/increase/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
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

export const createIncrease = (increase: {
    description: string, value: string, date: Date
}) => {
  fetch(`${api}/increase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        { 
            description: increase.description, 
            value: increase.value, 
            date: increase.date 
        })
  })
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
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

export const updateIncrease = (increase: {id: number, description: string, value: string, date: Date}) => {
  fetch(`${api}/increase/${increase.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ description: increase.description, value: increase.value, date: increase.date })
  })
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
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

export const deleteIncrease = () => {
  fetch(`${api}/increase`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
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
 