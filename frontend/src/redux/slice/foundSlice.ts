import { createSlice } from "@reduxjs/toolkit";
const initialState={
    allFounds:[],
}
const foundSlice=createSlice({
    name: "founds",
    initialState,
    reducers:{
        setAllFounds:(state, action)=>{
            state.allFounds=action.payload
        }
    }
})
export const {setAllFounds}=foundSlice.actions
export default foundSlice.reducer