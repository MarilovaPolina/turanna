import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createInfoSheet = createAsyncThunk(
  'infoSheet/createInfoSheet',
  async ({ title, content }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.post('http://localhost:8000/api/info-sheets', {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
          
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при создании справки')
    }
  }
)

export const deleteInfoSheet = createAsyncThunk(
  'infoSheet/deleteInfoSheet',
  async(infoSheetId, {rejectWithValue, getState, dispatch}) => {
    try{
      const { auth } = getState();
      await axios.delete(`http://localhost:8000/api/info-sheets/${infoSheetId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
          
      });

      dispatch(removeInfoSheet({ id: infoSheetId }));
      return infoSheetId;
    }
    catch(error){
      return rejectWithValue(error.response?.data?.message || "Ошибка при удалении справки");
    }
  }
)

export const updateInfoSheet = createAsyncThunk(
  'infoSheet/updateInfoSheet',
  async({infoSheetId, title, content}, {rejectWithValue, getState}) => {
    try{
      console.log("ЩА БУДЕМ ЛОГИРОВАТЬ");
      console.log(title);
      console.log(content);

      const { auth } = getState();
      const { data } = await axios.put(`http://localhost:8000/api/info-sheets/${infoSheetId}`, { title, content }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return data;
    }
    catch(error){
      return rejectWithValue(error.response?.data?.message || 'Ошибка при редактировании справки');
    }
  }
)

export const getInfoSheets = createAsyncThunk(
  'infoSheet/getInfoSheets',
  async(_, { rejectWithValue, getState }) => {
    try{
      const { auth } = getState();
      const { data } = await axios.get('http://localhost:8000/api/info-sheets', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
          
      });

      return data;
    }
    catch(error){
      return rejectWithValue(error.response?.data?.message || "Ошибка при получении справочной информации");
    }
  }
)

const infoSheetSlice = createSlice({
  name: 'infoSheet',
  initialState: {
    loading: false,
    error: null,
    infoSheet: null,
    success: false,
    infoSheets: [],
  },
  reducers: {
    removeInfoSheet: (state, action) => {
      state.infoSheets = state.infoSheets.filter(infoSheet => infoSheet.id !== action.payload.id);
    },
    resetSuccess: (state) => {
      state.success = false;
    }
  },
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
        state.success = false;
      })

      .addCase(deleteInfoSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteInfoSheet.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteInfoSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(getInfoSheets.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getInfoSheets.fulfilled, (state, action) => {
        state.loading = false;
        state.infoSheets = action.payload;
        state.success = true;
      })
      .addCase(getInfoSheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(updateInfoSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateInfoSheet.fulfilled, (state, action) =>{
        state.loading = false;
        state.success = true;
        state.infoSheets = state.infoSheets.map(sheet =>
          sheet.id === action.payload.id ? action.payload : sheet
        );
      })
      .addCase(updateInfoSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
  },
})

export const { removeInfoSheet, resetSuccess } = infoSheetSlice.actions;
export default infoSheetSlice.reducer;
