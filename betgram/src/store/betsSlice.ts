import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OddsBet } from "@/types/odds";
import { Fixture, FixtureData } from "@/types/results";

interface BetState {
  bets: Array<{
    fixture: FixtureData;
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
    addBet(state, action: PayloadAction<{ fixture: FixtureData; bet: OddsBet, valueKey?: string }>) {
      state.bets.push(action.payload);
    },
    removeBet(state, action: PayloadAction<{ fixtureId: string; betId: string, valueKey?: string }>) {
      state.bets = state.bets.filter(
        (b) => b.fixture.fixture.id.toString() !== action.payload.fixtureId || b.bet.id !== action.payload.betId
      );
    },
    replaceBet(state, action: PayloadAction<{ fixture: FixtureData; bet: OddsBet, valueKey?: string }>) {
      state.bets = state.bets.filter((b) => b.fixture.fixture.id !== action.payload.fixture.fixture.id);
      state.bets.push(action.payload);
    },
  },
});

export const { addBet, removeBet, replaceBet } = betsSlice.actions;
export default betsSlice.reducer;