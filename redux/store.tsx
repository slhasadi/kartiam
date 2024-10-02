import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";
import workMasterSlice from "./slices/workMasterSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    workMaster: workMasterSlice,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
