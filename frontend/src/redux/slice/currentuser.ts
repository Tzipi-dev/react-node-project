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
 const currentUserSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
     setCurrentUser: (state, action) => {
       state.currentUser = action.payload;
     },
   
   },
 });
 export const { setCurrentUser } = currentUserSlice.actions;
 export const selectCurrentUser = (state:{user:UserState} ) =>
 state.user.currentUser;

 export default currentUserSlice.reducer;