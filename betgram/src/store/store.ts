import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './errorSlice';
import betsReducer from './betsSlice';

const store = configureStore({
  reducer: {
    error: errorReducer,
    bets: betsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;