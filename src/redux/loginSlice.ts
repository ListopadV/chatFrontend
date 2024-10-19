import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {LoginState} from "../types";

const initialState: LoginState = {
    access_token: '' ,
    user: {}
}

const loginSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload;
        },
        setUser: (state, action: PayloadAction<object>) => {
          state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {};
            state.access_token = '';
        }
    }
});

export const { setAccessToken, setUser, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
