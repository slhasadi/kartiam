import { getInfoCustomer } from "../../network/customer";
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  user: any;
}

const initialState: any = {
  user: {},
};

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export const getUserInfo = (page: string) => {
  return async function (dispatch: any) {
    const response = await getInfoCustomer()
      .then((response) => {
        setUserInfo(response.data);
        dispatch(setUserInfo(response.data));
      })
      .catch((error) => {
        if (
          error?.response?.status == 401 ||
          (error?.code == "ERR_NETWORK" && page == "dashboard")
        ) {
          window.location.replace("/");
        }
      });
  };
};

export default userSlice.reducer;
