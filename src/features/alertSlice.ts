import {createSlice,PayloadAction} from "@reduxjs/toolkit";

export interface AlertState {
    title?: string
    text: string,
    type?: 'success' | 'error' | null,
    id?: number

}
interface AlertActionState {
    type?: 'success' | 'error' | null,
    title: string,
    text: string,
    id?: number
}
const initialState: AlertState[] = []

const alertSlice = createSlice({
    name:'alert',
    initialState,
    reducers:{
        addAlert(state, action: PayloadAction<AlertActionState>){
            const alertId = state.length
            state = [ {
                type: action.payload.type ?? null,
                title: action.payload.title ?? null,
                text: action.payload.text,
                id: alertId
            }, ...state]
            console.log(alertId)

            setTimeout(() => {
                state = state.filter(i => i.id !== alertId)
            }, 3000)
        },
        popAlert(state){
            state.pop()
            console.log(state.length)
        },
        resetAlerts(state){
            state.length = 0
        }
    }
})
export const {addAlert, popAlert, resetAlerts} = alertSlice.actions
export default alertSlice.reducer
