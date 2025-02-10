import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../store/index.module";

export interface AlertState {
    title?: string;
    text: string;
    type?: "success" | "error" | null;
    id?: number;
    visible: boolean;
}

const initialState: AlertState[] = [];



export const AlertSuccess = (data: Omit<AlertState, "type" | "visible">) => (dispatch: AppDispatch) => {
    const alert:AlertState = { ...data, type: "success", id: Date.now(), visible: true };
    dispatch(addAlert(alert));

    setTimeout(() => {
        if(alert.id) {
            dispatch(hideAlert(alert.id)); // 🔥 Start fade-out
            setTimeout(() => {
                if(alert.id)
                    dispatch(removeAlert(alert.id))
            }, 500);
        } // Remove after animation
    }, 3000);
};

export const AlertError = (data: Omit<AlertState, "type" | "visible">) => (dispatch: AppDispatch) => {
    const alert: AlertState = { ...data, type: "error", id: Date.now(), visible: true };
    dispatch(addAlert(alert));

    setTimeout(() => {
        if(alert.id) {
            dispatch(hideAlert(alert.id));
            setTimeout(() => {
                if (alert.id)
                    dispatch(removeAlert(alert.id))

            }, 500);
        }
    }, 3000);
};
const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<AlertState>) => {
            state.unshift({ ...action.payload, visible: true });
        },
        hideAlert: (state, action: PayloadAction<number>) => {
            const alert = state.find((alert) => alert.id === action.payload);
            if (alert) alert.visible = false;
        },
        removeAlert: (state, action: PayloadAction<number>) => {
            return state.filter((alert) => alert.id !== action.payload);
        },
        resetAlerts: () => initialState,
    },
});

export const { addAlert, removeAlert, resetAlerts,hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
