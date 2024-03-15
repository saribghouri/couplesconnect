import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (page, { rejectWithValue }) => {
      try {
        const token = Cookies.get("apiToken"); // Retrieve the token from cookies
        const response = await fetch(`https://mksm.blownclouds.com/api/all/user?page=${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const initialState = {
    users: [],
    isLoading: false,
    error: null,
    currentPage: 1,
  };
  
  const userApiSlice = createSlice({
    name: 'Allusers',
    initialState,
    reducers: {
      // Optionally, add reducers for other actions, such as setting the current page
      setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
    },
    extraReducers: {
      [fetchUsers.pending]: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      [fetchUsers.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users; // Assuming the API response structure
        // You might need to adjust based on the actual API response
      },
      [fetchUsers.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
  });
  
  // Export the action created by createSlice
  export const { setCurrentPage } = userApiSlice.actions;
  
  export default userApiSlice.reducer;