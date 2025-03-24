import { createSlice } from "@reduxjs/toolkit";
import { Lost } from "../../interfaces/models";
const initialState: { allLosts: Lost[] } = {
    allLosts: [],
};

const lostSlice = createSlice({
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
export const { setAllLosts, addLost } = lostSlice.actions
export default lostSlice.reducer