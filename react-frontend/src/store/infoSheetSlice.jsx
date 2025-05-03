import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createInfoSheet = createAsyncThunk(
  'infoSheet/createInfoSheet',
  async ({ title, content }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const { data } = await axios.post('http://localhost:8000/api/info-sheets', {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })

      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при создании справки')
    }
  }
)

const infoSheetSlice = createSlice({
  name: 'infoSheet',
  initialState: {
    loading: false,
    error: null,
    infoSheet: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createInfoSheet.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createInfoSheet.fulfilled, (state, action) => {
        state.loading = false;
        state.infoSheet = action.payload;
        state.success = true;
      })
      .addCase(createInfoSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default infoSheetSlice.reducer;
