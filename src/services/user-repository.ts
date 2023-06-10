import api from "../config/api";
import { Users } from "../types";

  
export const listUser = async () => {
  try {
     const response = await fetch(`${api}/user`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     });
 
     if (!response.ok) {
       throw new Error('GET falhou');
     }
     const user: Users[] = await response.json();
     console.log('user:', user);
 
     return user;
   } catch (error) {
     console.error('Error:', error);
     return [];
   }
 }

  export const getUserById = (userId: number) => {
    fetch(`${api}/user/${userId}`)
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

  export const createUser = (user: {name: string, email: string, password: string}) => {
    fetch(`${api}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: user.name, email: user.email , password: user.password})
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

  export const uppasswordUser = (user: {name: string, email: string, password: string}) => {
    fetch(`${api}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
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

  export const deleteUser = (user: {name: string, email: string, password: string}) => {
    fetch(`${api}/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
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
