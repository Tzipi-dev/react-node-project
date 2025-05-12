import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/models";

interface UserState {
  currentUser: User|null
}
  const initialState: UserState = {
    currentUser: null,
  };
const CurrentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  
  },
});
export const { setCurrentUser } = CurrentUserSlice.actions;
export const selectCurrentUser = (state:{user:UserState} ) =>
  state.user.currentUser;
export default CurrentUserSlice.reducer;