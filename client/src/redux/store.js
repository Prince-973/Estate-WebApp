import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";

export default configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializaCheck: false,
    }),
});
