import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./modules/Accounts";
import menuReducer from "./modules/Menus";
import dateReducer from "./modules/Dates";
import incomesReducer from "./modules/Incomes";
import expansesReducer from "./modules/Expanses";
import transactionsReducer from "./modules/Transactions";
import feedbacksReducer from "./modules/Feedbacks";
import themeReducer from "./modules/Theme";

export default configureStore({
  reducer: {
    accounts: accountReducer,
    menus: menuReducer,
    dates: dateReducer,
    incomes: incomesReducer,
    expanses: expansesReducer,
    transactions: transactionsReducer,
    feedbacks: feedbacksReducer,
    themes: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
