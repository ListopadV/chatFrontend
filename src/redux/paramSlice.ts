import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ParamsState {
    temperature: number,
    max_tokens: number,
    top_p: number
}

const initialState: ParamsState = {
    temperature: 0.7,
    max_tokens: 800,
    top_p: 0.95
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

export const {setTemperature, setTopP, setTokens} = paramSlice.actions;
export default paramSlice.reducer;

