import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createArticle = createAsyncThunk(
    'article/createArticle',
    async ( formData , { rejectWithValue, getState }) => {
      try {
        const { auth } = getState();
        
        const { data } = await axios.post('http://localhost:8000/api/articles', formData, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
      
          },
        });
    
        return data;
      } catch (error) {
        if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const errorMessage = Object.values(errors).flat().join(' ');
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue(error.response?.data?.message || 'Ошибка при создании статьи');
      }
    }
  );

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async(articleId, {rejectWithValue, getState, dispatch}) => {
    try{
      const { auth } = getState();
      await axios.delete(`http://localhost:8000/api/articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
          
      });

      dispatch(removeArticle({ id: articleId }));
      return articleId;
    }
    catch(error){
      return rejectWithValue(error.response?.data?.message || "Ошибка при удалении статьи");
    }
  }
)

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async({articleId, title, content, main_image}, {rejectWithValue, getState}) => {
    try{
      const { auth } = getState();
      const { data } = await axios.put(`http://localhost:8000/api/articles/${articleId}`, { title, content, main_image }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return data;
    }
    catch(error){
      return rejectWithValue(error.response?.data?.message || 'Ошибка при редактировании статьи');
    }
  }
)

export const getArticles = createAsyncThunk(
  'article/getArticles',
  async(_, { rejectWithValue, getState }) => {
    try{
      const { auth } = getState();
      const { data } = await axios.get('http://localhost:8000/api/articles', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
          
      });

      return data;
    }
    catch(error){
      return rejectWithValue(error.response?.data?.message || "Ошибка при получении информации о статье");
    }
  }
)

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    loading: false,
    error: null,
    article: null,
    success: false,
    articles: [],
  },
  reducers: {
    removeArticle: (state, action) => {
      state.articles = state.articles.filter(article => article.id !== action.payload.id);
    },
    resetSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createArticle.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
        state.success = true;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(getArticles.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        state.success = true;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateArticle.fulfilled, (state, action) =>{
        state.loading = false;
        state.success = true;
        state.articles = state.articles.map(sheet =>
          sheet.id === action.payload.id ? action.payload : sheet
        );
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
  },
})

export const { removeArticle, resetSuccess } = articleSlice.actions;
export default articleSlice.reducer;
