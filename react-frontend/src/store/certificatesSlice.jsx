import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCertificates = createAsyncThunk(
  'certificates/getCertificates',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('http://localhost:8000/api/certificates', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке сертификатов');
    }
  }
);

export const createCertificate = createAsyncThunk(
  'certificates/createCertificate',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.post('http://localhost:8000/api/certificates', formData, {
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
      return rejectWithValue(error.response?.data?.message || 'Ошибка при создании сертификата');
    }
  }
);

export const deleteCertificate = createAsyncThunk(
    'certificates/deleteCertificate',
    async (certificateId, { rejectWithValue, getState, dispatch }) => {
        try{
            const { auth } = getState();
            await axios.delete(`http://localhost:8000/api/certificates/${certificateId}`, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            });
            dispatch(removeCertificate({id: certificateId}));
        } catch (error) {
          return rejectWithValue(error.response?.data?.message || 'Ошибка при удалении сертификата');
        }
    }
)

export const updateCertificate = createAsyncThunk(
    'certificates/updateCertificate',
    async ({ certificateId, formData }, { rejectWithValue, getState }) => {
      try {
        const { auth } = getState();
        const { data } = await axios.post(`http://localhost:8000/api/certificates/${certificateId}?_method=PUT`, formData, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении сертификата');
      }
    }
  );

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState: {
    certificates: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess: (state) => {
        state.success = false;
    },
    removeCertificate: (state, action) => {
        state.certificates = state.certificates.filter(certificate => certificate.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(getCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.unshift(action.payload);
        state.success = true;
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(deleteCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCertificate.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(updateCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.certificates.findIndex(cert => cert.id === action.payload.id);
        if (index !== -1) {
          state.certificates[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSuccess, removeCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer;
