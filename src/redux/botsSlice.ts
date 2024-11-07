import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AppDispatch} from "../store";
import axios from 'axios';
import {BotsState, Bot} from "../types";
import { url } from '../variables';

const initialState: BotsState = {
    bots: []
}
const botsSlice = createSlice({
    name: 'bots',
    initialState,
    reducers: {
        setBots: (state, action: PayloadAction<Bot[]>) => {
            state.bots = action.payload;
        },
        clearBots: (state) => {
            state.bots = [];
        }
    }
});

export const fetchBots = (accessToken: string) => async (dispatch: AppDispatch) => {
   try {
        await axios.get(`${url}/bots/motherfuckers`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
            // withCredentials: true
    }).then(response => {
        console.log(response.data);
        dispatch(setBots(response.data.bots));
    })
   } catch (e){
       console.error("Error fetching bots: ", e);
   }
}

export const { setBots } = botsSlice.actions;
export default botsSlice.reducer;
