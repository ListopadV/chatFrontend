import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoginState} from "../Entities/AuthEntities";

const initialState: LoginState = {
    user: {}
}

const loginSlice = createSlice({
    name: 'authentication', initialState, reducers: {
        setUser: (state, action: PayloadAction<object>) => {
            state.user = action.payload;
        }, clearUser: (state) => {
            state.user = {};
        }
    }
});

export const {setUser, clearUser} = loginSlice.actions;
export default loginSlice.reducer;
