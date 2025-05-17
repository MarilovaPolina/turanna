import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPartners = createAsyncThunk(
  'partners/getPartners',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('http://localhost:8000/api/partners', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке партнёров');
    }
  }
);

export const createPartner = createAsyncThunk(
  'partners/createPartner',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.post('http://localhost:8000/api/partners', formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const errorMessage = Object.values(errors).flat().join(' ');
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue(error.response?.data?.message || 'Ошибка при создании партнёра');
    }
  }
);

export const deletePartner = createAsyncThunk(
  'partners/deletePartner',
  async (partnerId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { auth } = getState();
      await axios.delete(`http://localhost:8000/api/partners/${partnerId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      dispatch(removePartner({ id: partnerId }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при удалении партнёра');
    }
  }
);

export const fetchPartner = createAsyncThunk(
  'partners/fetchPartner',
  async (partnerId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`http://localhost:8000/api/partners/${partnerId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке партнёра');
    }
  }
);

export const updatePartner = createAsyncThunk(
  'partners/updatePartner',
  async ({ partnerId, formData }, { rejectWithValue, getState }) => {
    try {
      formData.append('_method', 'PUT');
      const { auth } = getState();
      const response = await axios.post(
        `http://localhost:8000/api/partners/${partnerId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении партнёра');
    }
  }
);

const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    partners: [],
    currentPartner: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    removePartner: (state, action) => {
      state.partners = state.partners.filter(p => p.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(getPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners.unshift(action.payload);
        state.success = true;
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(deletePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deletePartner.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(fetchPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentPartner = null;
      })
      .addCase(fetchPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPartner = action.payload;
      })
      .addCase(fetchPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentPartner = null;
      })

      .addCase(updatePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.partners.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.partners[index] = action.payload;
        }
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, removePartner } = partnersSlice.actions;
export default partnersSlice.reducer;
