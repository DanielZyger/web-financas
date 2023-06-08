// import {
//     addCreatedExpanse,
//     addExpanse,
//     addExpanseOnAccount,
//     addExpanses,
//     addExpansesOnAccount,
//     changeLoadingState,
//     removeExpanseOnAccountState,
//     removeExpanseState,
//     updateExpanseState,
//   } from "..";
//   import { checkApiError } from "../../../../utils/checkApiError";
//   import {
//     IAccount,
//     ICreateExpanse,
//     ICreateExpanseOnAccount,
//     IUpdateExpanse,
//   } from "../../../interfaces";
//   import { updateAccountState } from "../../Accounts";
//   import { changeCardLoadingState } from "../../CreditCards";
//   import { listCreditCards } from "../../CreditCards/fetchActions";
//   import { addMessage } from "../../Feedbacks";
import api from "../config/api";

  
  export const listCategory = () => {
    fetch(`${api}/category`)
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

  export const getCategoryById = (categoryId: number) => {
    fetch(`${api}/category/${categoryId}`)
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

  export const deleteCategory = (id: number) => {
    fetch(`${api}/category/${id}`, {
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







    // return (dispatch: any) => {
    //   api.get(`category`)
    //     .then((res) => {
    //         console.log('resposta', res.data)
    //     //   dispatch(addExpanses(res.data));
    //     })
    //     .catch((error) => {
    //     //   dispatch(changeLoadingState(false));
    //     //   dispatch(
    //     //     addMessage({
    //     //       type: "error",
    //     //       message: checkApiError(e),
    //     //     })
    //     //   );
    //     console.log('erro', error)
    //     });
    // };
  
//   export const listExpansesOnAccount = (userId: string) => {
//     return (dispatch: any) => {
//       api
//         .get(`expansesOnAccount/user/${userId}`)
//         .then((res) => {
//           dispatch(addExpansesOnAccount(res.data));
//         })
//         .catch((e) => {
//           dispatch(changeLoadingState(false));
//           dispatch(
//             addMessage({
//               type: "error",
//               message: checkApiError(e),
//             })
//           );
//         });
//     };
//   };
  
//   export const createExpanse = (
//     expanse: ICreateExpanse,
//     received?: boolean,
//     fromInvoice?: boolean
//   ) => {
//     return (dispatch: any) => {
//       dispatch(changeLoadingState(true));
//       if (fromInvoice) {
//         dispatch(changeCardLoadingState(true));
//       }
//       api
//         .post(`expanses`, expanse)
//         .then((res) => {
//           dispatch(addExpanse(res.data));
//           if (received) dispatch(addCreatedExpanse(res.data));
//           if (fromInvoice) {
//             dispatch(listCreditCards(expanse.userId));
//           }
//           dispatch(
//             addMessage({
//               type: "success",
//               message: "Despesa criada com sucesso!",
//             })
//           );
//         })
//         .catch((e) => {
//           dispatch(changeLoadingState(false));
//           dispatch(
//             addMessage({
//               type: "error",
//               message: checkApiError(e),
//             })
//           );
//         });
//     };
//   };
  
//   export const updateExpanse = (
//     expanse: IUpdateExpanse,
//     expanseId: string,
//     fromInvoice: boolean
//   ) => {
//     return (dispatch: any) => {
//       dispatch(changeLoadingState(true));
//       if (fromInvoice) {
//         dispatch(changeCardLoadingState(true));
//       }
//       api
//         .put(`expanses/${expanseId}`, expanse)
//         .then((res) => {
//           dispatch(updateExpanseState(res.data));
//           if (fromInvoice) {
//             dispatch(listCreditCards(expanse.userId));
//           }
//           dispatch(
//             addMessage({
//               type: "success",
//               message: "Despesa atualizada com sucesso!",
//             })
//           );
//         })
//         .catch((e) => {
//           dispatch(changeLoadingState(false));
//           dispatch(
//             addMessage({
//               type: "error",
//               message: checkApiError(e),
//             })
//           );
//         });
//     };
//   };
  
//   export const deleteExpanseOnInvoice = (
//     id: string,
//     expanseId: string,
//     userId: string
//   ) => {
//     return (dispatch: any) => {
//       dispatch(changeLoadingState(true));
//       dispatch(changeCardLoadingState(true));
//       api
//         .delete(`expansesOnInvoice/${id}`)
//         .then(() => {
//           dispatch(deleteExpanse(expanseId, userId, true));
//         })
//         .catch((e) => {
//           dispatch(changeLoadingState(false));
//           dispatch(changeCardLoadingState(false));
//           dispatch(
//             addMessage({
//               type: "error",
//               message: checkApiError(e),
//             })
//           );
//         });
//     };
//   };
  
//   export const deleteExpanse = (
//     expanseId: string,
//     userId: string,
//     fromInvoice?: boolean
//   ) => {
//     return (dispatch: any) => {
//       dispatch(changeLoadingState(true));
//       if (fromInvoice) {
//         dispatch(changeCardLoadingState(true));
//       }
//       api
//         .delete(`expanses/${expanseId}/${userId}`)
//         .then((res) => {
//           dispatch(removeExpanseState(expanseId));
//           if (fromInvoice) {
//             dispatch(listCreditCards(userId));
//           }
//           dispatch(
//             addMessage({
//               type: "success",
//               message: "Despesa excluída",
//             })
//           );
//         })
//         .catch((e) => {
//           dispatch(changeLoadingState(false));
//           dispatch(
//             addMessage({
//               type: "error",
//               message: checkApiError(e),
//             })
//           );
//         });
//     };
//   };
  
//   export const createExpanseOnAccount = (
//     expanseOnAccount: ICreateExpanseOnAccount,
//     account: IAccount
//   ) => {
//     return (dispatch: any) => {
//       dispatch(changeLoadingState(true));
//       api
//         .post(`expansesOnAccount`, expanseOnAccount)
//         .then((res) => {
//           dispatch(addExpanseOnAccount(res.data));
  
//           const accountUpdated = {
//             ...account,
//             balance: account.balance - res.data.value,
//             expansesOnAccount: [...account.expansesOnAccount, res.data],
//           };
  
//           dispatch(updateAccountState(accountUpdated));
//           dispatch(
//             addMessage({
//               type: "success",
//               message: "Despesa paga com sucesso!",
//             })
//           );
//         })
//         .catch((e) => {
//           dispatch(changeLoadingState(false));
//           dispatch(
//             addMessage({
//               type: "error",
//               message: checkApiError(e),
//             })
//           );
//         });
//     };
//   };
  
//   export const deleteExpanseOnAccount = (
//     expanseOnAccountId: string,
//     userId: string,
//     account: IAccount
//   ) => {
//     return (dispatch: any) => {
//       dispatch(changeLoadingState(true));
//       api
//         .delete(`expansesOnAccount/${expanseOnAccountId}/${userId}`)
//         .then((res) => {
//           dispatch(removeExpanseOnAccountState(expanseOnAccountId));
  
//           const accountUpdated = {
//             ...account,
//             balance: account.balance + res.data.value,
//             expansesOnAccount: [
//               ...account.expansesOnAccount.filter((i) => i.id !== res.data.id),
//             ],
//           };
  
//           dispatch(updateAccountState(accountUpdated));
//           dispatch(
//             addMessage({
//               type: "success",
//               message: "Pagamento excluído com sucesso!",
//             })
//           );
//         })
//         .catch((e) => {
//           dispatch(changeLoadingState(false));
//           dispatch(
//             addMessage({
//               type: "error",
//               message: checkApiError(e),
//             })
//           );
//         });
//     };
//   };
  