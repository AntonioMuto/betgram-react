import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  messages: { id: string; text: string }[];
}

const initialState: ErrorState = {
  messages: [],
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<string>) => {
      state.messages.push({ id: Date.now().toString(), text: action.payload });
    },
    removeError: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((error) => error.id !== action.payload);
    },
    clearErrors: (state) => {
      state.messages = [];
    },
  },
});

export const { addError, removeError, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;