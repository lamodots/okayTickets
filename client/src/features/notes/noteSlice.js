import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchNotes, submitNotes
} from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all notes
export const getNotes = createAsyncThunk(
  "notes/getnotes",
  async (ticketId, thunkAPI) => {
    try {
      // Get token from the user in auth state
      const token = thunkAPI.getState().auth.user.token;
      return await fetchNotes(ticketId, token);
      
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add note notes
export const addNotes = createAsyncThunk(
  "notes/addnotes",
  async ({ noteText , ticketId}, thunkAPI) => {
    try {
      // Get token from the user in auth state
      const token = thunkAPI.getState().auth.user.token;
      return await submitNotes(noteText, ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // Add any fetched data to the array
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(addNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // Add any fetched data to the array
        state.notes.push(action.payload);
      })
      .addCase(addNotes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
