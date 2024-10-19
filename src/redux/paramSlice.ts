import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ParamsState } from '../types';

const initialState: ParamsState = {
    temperature: 70,
    max_tokens: 800,
    top_p: 95
}

const paramSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        setTemperature: (state, action: PayloadAction<number>) => {
            state.temperature = action.payload;
        },
        setTokens: (state, action: PayloadAction<number>) => {
            state.max_tokens = action.payload;
        },
        setTopP: (state, action: PayloadAction<number>) => {
            state.top_p = action.payload;
        }
    }
});

export const { setTemperature, setTopP, setTokens } = paramSlice.actions;
export default paramSlice.reducer;

