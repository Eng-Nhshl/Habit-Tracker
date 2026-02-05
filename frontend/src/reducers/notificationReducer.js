import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, type: "success" },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return { message: null, type: "success" };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const notify = (message, type = "success", seconds = 3) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
