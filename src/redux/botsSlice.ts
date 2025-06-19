import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {BotsState, BotEntity} from "../Entities/BotEntities";

const initialState: BotsState = {
    bots: []
}
const botsSlice = createSlice({
    name: 'bots',
    initialState,
    reducers: {
        setBots: (state, action: PayloadAction<BotEntity[]>) => {
            state.bots = action.payload;
        },
        clearBots: (state) => {
            state.bots = [];
        }
    }
});

export const { setBots } = botsSlice.actions;
export default botsSlice.reducer;
