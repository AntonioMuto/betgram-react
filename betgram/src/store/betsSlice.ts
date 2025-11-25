import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OddsBet } from "@/types/odds";
import { FixtureData } from "@/types/results";

interface BetState {
  bets: Array<{
    fixture: FixtureData;
    bet: OddsBet;
    valueKey?: string
  }>;
}

const initialState: BetState = {
  bets: localStorage?.getItem("bets") ? JSON.parse(localStorage?.getItem("bets")!) : [],
};

const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    addBet(state, action: PayloadAction<{ fixture: FixtureData; bet: OddsBet, valueKey?: string }>) {
      state.bets.push(action.payload);
      localStorage.setItem("bets", JSON.stringify(state.bets));
    },
    removeBet(state, action: PayloadAction<{ fixtureId: string; betId: string, valueKey?: string }>) {
      state.bets = state.bets.filter(
        (b) => b.fixture.fixture.id.toString() !== action.payload.fixtureId || b.bet.id !== action.payload.betId
      );
      localStorage.setItem("bets", JSON.stringify(state.bets));
    },
    removeBetByIndex(state, action: PayloadAction<number>) {
      state.bets.splice(action.payload, 1);
      localStorage.setItem("bets", JSON.stringify(state.bets));
    },
    replaceBet(state, action: PayloadAction<{ fixture: FixtureData; bet: OddsBet, valueKey?: string }>) {
      state.bets = state.bets.filter((b) => b.fixture.fixture.id !== action.payload.fixture.fixture.id);
      state.bets.push(action.payload);
      localStorage.setItem("bets", JSON.stringify(state.bets));
    },
    removeAllBets(state) {
      state.bets = [];
      localStorage.setItem("bets", JSON.stringify(state.bets));
    },
  },
});

export const { addBet, removeBet, replaceBet, removeBetByIndex, removeAllBets } = betsSlice.actions;
export default betsSlice.reducer;