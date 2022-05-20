import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  deck_id: "",
  shuffled: false,
  remaining: 0,
  loading: false,
  error: "",
  cards: [],
  all_hands: [],
};

export const getNewDeck = createAsyncThunk("deck/getNewDeck", async () => {
  let dataUrl = `https://deckofcardsapi.com/api/deck/new/`;
  let results = await axios.get(dataUrl);
  return results;
});

export const shuffleCardsInDeck: any = createAsyncThunk(
  "deck/shuffleDeck",
  /**  @param deck_id {{ deck_id: string}} */
  async (deck_id: string) => {
    let dataUrl = `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/?remaining=true`;
    let results = await axios.get(dataUrl);
    return results;
  }
);

export const drawFiveCards = createAsyncThunk(
  "deck/drawFiveCards",
  /**  @param deck_id {{ deck_id: string}} */
  async (deck_id: string) => {
    let dataUrl = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=5`;
    let results = await axios.get(dataUrl);
    return results;
  }
);

const deckSlice = createSlice({
  name: "deck",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewDeck.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewDeck.fulfilled, (state, action: any) => {
        state.loading = false;
        let { success, deck_id, shuffled, remaining, error } =
          action.payload.data;
        Object.assign(state, {
          success,
          deck_id,
          shuffled,
          remaining,
          error,
          all_hands: [],
        });
      })
      .addCase(getNewDeck.rejected, (state, action: any) => {
        state.loading = false;
        state.error = "Failed to get new deck";
      })
      .addCase(shuffleCardsInDeck.pending, (state) => {
        state.loading = true;
      })
      .addCase(shuffleCardsInDeck.fulfilled, (state, action: any) => {
        state.loading = false;
        let { success, deck_id, shuffled, remaining, error } =
          action.payload.data;
        Object.assign(state, {
          success,
          deck_id,
          shuffled,
          remaining,
          error,
        });
      })
      .addCase(shuffleCardsInDeck.rejected, (state, action: any) => {
        state.loading = false;
        state.error = "Failed to shuffle deck";
      })
      .addCase(drawFiveCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(drawFiveCards.fulfilled, (state, action: any) => {
        state.loading = false;
        let { success, deck_id, remaining, cards, error } = action.payload.data;
        Object.assign(state, {
          success,
          deck_id,
          cards,
          remaining,
          error,
          all_hands: [...state.all_hands, cards],
        });
      })
      .addCase(drawFiveCards.rejected, (state, action: any) => {
        state.loading = false;
        state.error = "Failed to draw five cards";
      });
  },
});

export default deckSlice.reducer;
