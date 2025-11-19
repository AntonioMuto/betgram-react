import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './errorSlice';

const store = configureStore({
  reducer: {
    error: errorReducer,
  },
});

export default store; // Fixed default export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;