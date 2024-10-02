import { GetInfoWorkMaster } from "../../network/work-master";
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  workMaster: any;
}

const initialState: any = {
  workMaster: {},
};

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;

export const workMasterSlice = createSlice({
  name: "workMaster",
  initialState,
  reducers: {
    setWorkMasterInfo: (state, action) => {
      state.workMaster = action.payload;
    },
  },
});
export const { setWorkMasterInfo } = workMasterSlice.actions;

export const getWorkMasterInfo = (page: string) => {
  return async function (dispatch: any) {
    const response = await GetInfoWorkMaster()
      .then((response) => {
        dispatch(setWorkMasterInfo(response.data));
      })
      .catch((error) => {
        if (
          error?.response?.status == 401 ||
          (error?.code == "ERR_NETWORK" && page == "wm-dashboard")
        ) {
          window.location.replace("/");
        }
      });
  };
};
export default workMasterSlice.reducer;
