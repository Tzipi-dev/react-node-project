import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/models";
const defaultUser: User = {
    name: 'Guest',
    email: '',
    password: "",
    phone: ""
};
interface UserState {
  currentUser: User|null
}
  const initialState: UserState = {
    currentUser: defaultUser,
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