import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'id', 
  sortOrder: 'desc',
};

const tableSortSlice = createSlice({
  name: 'tableSort',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload; 
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'; 
    },
    resetSort: (state) => {
      state.sortBy = 'id'; 
      state.sortOrder = 'asc'; 
    },
  },
  extraReducers: (builder) => {},
});

export const { setSortBy, setSortOrder, toggleSortOrder, resetSort } = tableSortSlice.actions;
export default tableSortSlice.reducer;


export const sortData = (data, sortBy, sortOrder) => {
  const direction = sortOrder === 'asc' ? 1 : -1;

  return [...data].sort((a, b) => {
    if (sortBy === 'id') {
        return direction * (a.id - b.id);
    } else if (sortBy === 'title') {
        return direction * a.title.localeCompare(b.title);
    } else if (sortBy === 'date') {
        return direction * (new Date(a.created_at) - new Date(b.created_at));
    }else if (sortBy === 'email') {
        return direction * a.email.localeCompare(b.email);
    }else if (sortBy === 'name') {
        return direction * a.name.localeCompare(b.name);
    }

    return 0;
  });
};
