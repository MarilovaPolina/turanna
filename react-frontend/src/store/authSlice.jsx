import React from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async function({email, password}, {rejectWithValue}){
    try{
      const {data} = await axios.post("http://localhost:8000/api/login", {email, password});
      return data;
    }catch(error){
      return rejectWithValue(error.response?.data?.message || "Authorization error");
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue('Ошибка при получении пользователя');
    }
  }
);




const initialState = {
  loading: null,
  token: localStorage.getItem("token") || null,
  user: null,
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builer) => {
    builer
    .addCase(loginUser.pending, (state) =>{
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) =>{
      state.token = action.payload.token;
      state.user = action.payload.user; 
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
    })
    .addCase(loginUser.rejected, (state, action) =>{
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
