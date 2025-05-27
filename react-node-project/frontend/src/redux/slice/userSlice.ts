import { createSlice } from "@reduxjs/toolkit";
interface UserState {
  openSignUpModal: boolean,
  openLogInModal: boolean,
}
const initialState: UserState = {
  openSignUpModal: false,
  openLogInModal: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOpenSignUpModal: (state, action) => {
      state.openSignUpModal = action.payload;
    },
    setOpenLogInModal: (state, action) => {
      state.openLogInModal = action.payload;
    },
  },
});
export const { setOpenSignUpModal, setOpenLogInModal } = userSlice.actions;
export const selectOpenSignUpModal = (state:{user:UserState} ) =>
  state.user.openSignUpModal;
export const selectOpenLogInModal = (state:{user:UserState} )=>
  state.user.openLogInModal;
export default userSlice.reducer;