import { createSlice } from "@reduxjs/toolkit";
import { Lost } from "../../interfaces/models";

const initialState: { allLosts: Lost[] } = {
    allLosts: [],
};

const foundSlice = createSlice({
    name: "founds",
    initialState,
    reducers: {
        setAllLosts: (state, action) => {
            state.allLosts = action.payload
        },
        addLost: (state, action) => {
            state.allLosts.push(action.payload)
        }
    }
})
export const { setAllLosts,addLost } = foundSlice.actions
export default foundSlice.reducer