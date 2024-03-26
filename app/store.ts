import { configureStore } from "@reduxjs/toolkit";
import reviewReducer from "pages/reviews/reviewSlice";

const store = configureStore({
  reducer: {
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
