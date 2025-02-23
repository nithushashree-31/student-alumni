import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isAuthenticated:false,
        user:null
    },
    reducers:{
        loginUser: (state,action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        setUserEmail: (state, action) => {
            state.user = action.payload.value;
        }
    }
})

export const { loginUser, setUserEmail } = authSlice.actions;
export default authSlice.reducer;
