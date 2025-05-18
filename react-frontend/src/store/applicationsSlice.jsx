import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createApplication = createAsyncThunk(
  'applications/createApplication',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/applications', applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при создании заявки');
    }
  }
);

export const getApplications = createAsyncThunk(
  'applications/getApplications',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.get('http://localhost:8000/api/applications', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
          
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке заявок');
    }
  }
);

export const getApplicationById = createAsyncThunk(
  'applications/getApplicationById',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`http://localhost:8000/api/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке заявки');
    }
  }
);

export const deleteApplication = createAsyncThunk(
  'applications/deleteApplication',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await axios.delete(`http://localhost:8000/api/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при удалении заявки');
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ id, status }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(
        `http://localhost:8000/api/applications/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении статуса заявки');
    }
  }
);

export const uploadApplicationDocument = createAsyncThunk(
  'applications/uploadDocument',
  async ({ id, file }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const formData = new FormData();
      formData.append('document', file);
      const response = await axios.post(
        `http://localhost:8000/api/applications/${id}/document`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке документа заявки');
    }
  }
);

export const fetchApplicationDocuments = createAsyncThunk(
  'applications/fetchDocuments',
  async (applicationId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`http://localhost:8000/api/applications/${applicationId}/documents`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log('Документы из API:', response.data); 
     return { applicationId, documents: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке документов');
    }
  }
);

export const deleteApplicationDocument = createAsyncThunk(
  'applications/deleteDocument',
  async (documentId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await axios.delete(`http://localhost:8000/api/application-document/${documentId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return documentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при удалении документа');
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    currentApplication: null,
    loading: false,
    error: null,
    success: false,
    documents: [],
  },
  reducers: {
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
        state.success = true;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(getApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
        state.success = true;
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(getApplicationById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.currentApplication = null;
      })
      .addCase(getApplicationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApplication = action.payload;
        state.success = true;
      })
      .addCase(getApplicationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(deleteApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = state.applications.filter((app) => app.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.applications.findIndex(app => app.id === action.payload.id);
        if (index !== -1) state.applications[index].status = action.payload.status;
        if (state.currentApplication?.id === action.payload.id) {
          state.currentApplication.status = action.payload.status;
        }
        state.success = true;
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(fetchApplicationDocuments.pending, (state) => {
      state.loading = true;
      })
      .addCase(fetchApplicationDocuments.fulfilled, (state, action) => {
      state.documents = action.payload.documents;
        state.loading = false;
      })
      .addCase(fetchApplicationDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteApplicationDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteApplicationDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter(doc => doc.id !== action.payload);
      })
      .addCase(deleteApplicationDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadApplicationDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadApplicationDocument.fulfilled, (state, action) => {
        state.loading = false;
        
        const index = state.applications.findIndex(app => app.id === action.payload.id);
        if (index !== -1) state.applications[index].documents = action.payload.documents;
        
        if (state.currentApplication?.id === action.payload.id) {
          state.currentApplication.documents = action.payload.documents;
        }

        state.documents = action.payload.documents;
        
        state.success = true;
      })
      .addCase(uploadApplicationDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      

    }
});

export const { clearSuccess } = applicationsSlice.actions;
export default applicationsSlice.reducer;
