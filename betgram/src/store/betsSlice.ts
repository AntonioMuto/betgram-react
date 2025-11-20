import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OddsBet } from "@/types/odds";
import { Fixture } from "@/types/results";

interface BetState {
  bets: Array<{
    fixture: Fixture;
    bet: OddsBet;
    valueKey?: string
  }>;
}

const initialState: BetState = {
  bets: [],
};

const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    addBet(state, action: PayloadAction<{ fixture: Fixture; bet: OddsBet, valueKey?: string }>) {
      state.bets.push(action.payload);
    },
    removeBet(state, action: PayloadAction<{ fixtureId: string; betId: string, valueKey?: string }>) {
      state.bets = state.bets.filter(
        (b) => b.fixture.id.toString() !== action.payload.fixtureId || b.bet.id !== action.payload.betId
      );
    },
    replaceBet(state, action: PayloadAction<{ fixture: Fixture; bet: OddsBet, valueKey?: string }>) {
      state.bets = state.bets.filter((b) => b.fixture.id !== action.payload.fixture.id);
      state.bets.push(action.payload);
    },
  },
});

export const { addBet, removeBet, replaceBet } = betsSlice.actions;
export default betsSlice.reducer;