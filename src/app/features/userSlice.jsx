"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ userName, password }, { rejectWithValue }) => {
    try {
        const token = Cookies.get("apiToken");

      const response = await fetch('https://coupleskonnect.blownclouds.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
      const data = await response.json();
      Cookies.set("apiToken", data.access_token);
      if (!response.ok) {
        throw new Error(data.message || 'Unable to login');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;