import React from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue, getState }) => {
    try{
      const { auth } = getState();
      const { data } = await axios.post(
        "http://localhost:8000/api/user",
        userData,
        {
          headers:{
            Authorization: `Bearer ${auth.token}`
          }
        }
      );
      return data;
    }catch(error){
      return rejectWithValue(error.response?.data?.message || "User creation error");
    }
  }
);

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      console.log('Токен: ', auth.token);
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка при получении пользователей");
    } 
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { auth } = getState();
      await axios.delete(`http://localhost:8000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      
      dispatch(removeUser({ id: userId }));
      
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка при удалении пользователя");
    }
  }
);

const initialState = {
  loading: null,
  users: [],
  error: null,
  success: false
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.error = null;
      state.success = false;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; 
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {resetUserState, removeUser} = usersSlice.actions;
export default usersSlice.reducer;
