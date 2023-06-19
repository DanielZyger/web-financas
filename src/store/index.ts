import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./modules/Menus";
import dateReducer from "./modules/Dates";
import feedbacksReducer from "./modules/Feedbacks";
import themeReducer from "./modules/Theme";

export default configureStore({
  reducer: {
    menus: menuReducer,
    dates: dateReducer,
    feedbacks: feedbacksReducer,
    themes: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
