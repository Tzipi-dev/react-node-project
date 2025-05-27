import { createSlice } from "@reduxjs/toolkit";
import { Found } from "../../interfaces/models";
const initialState: { allFounds: Found[] } = {
    allFounds: [],
};

const foundSlice = createSlice({
    name: "founds",
    initialState,
    reducers: {
        setAllFounds: (state, action) => {
            state.allFounds = action.payload
        },
        addFound: (state, action) => {
            state.allFounds.push(action.payload)
        }
    }
})
export const { setAllFounds ,addFound} = foundSlice.actions
export const selectFounds = (state:{foundsArray:Found[]} )=>
  state.foundsArray
export default foundSlice.reducer