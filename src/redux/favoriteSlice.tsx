import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types/CharacterTypes';

interface FavoritesState {
  favorites: Character[];
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Character>) {
      if (state.favorites.length < 10) {
        state.favorites.push(action.payload);
      } else {
        state.error = 'You have reached the maximum number of favorite characters.';
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(character => character.id !== action.payload);
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { addFavorite, removeFavorite, clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
