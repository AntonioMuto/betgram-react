import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertType = 'error' | 'info' | 'success' | 'warning';

interface Alert {
  id: string;
  text: string;
  type: AlertType;
}

interface AlertState {
  messages: Alert[];
}

const initialState: AlertState = {
  messages: [],
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<{ text: string; type?: AlertType }>) => {
      state.messages.push({
        id: Date.now().toString(),
        text: action.payload.text,
        type: action.payload.type || 'info',
      });
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((alert) => alert.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.messages = [];
    },
  },
});

export const { addAlert, removeAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;