import api from "../config/api";
import { Categories } from "../types";

  
export const listCategory = async () => {
  try {
     const response = await fetch(`${api}/category`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     });
 
     if (!response.ok) {
       throw new Error('GET falhou');
     }
     const category: Categories[] = await response.json();
     console.log('category:', category);
 
     return category;
   } catch (error) {
     console.error('Error:', error);
     return [];
   }
 }

  export const getCategoryById = (categoryId: number) => {
    fetch(`${api}/category/${categoryId}`)
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

  export const createCategory = (category: {name: string, color: string}) => {
    fetch(`${api}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: category.name, color: category.color })
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

  export const updateCategory = (category: {id: number, name: string, color: string}) => {
    fetch(`${api}/category/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: category.name, color: category.color })
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

  export const deleteCategory = (id: number) => {
    fetch(`${api}/category/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
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
