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
      return direction * (a.title?.toString() ?? '').localeCompare(b.title?.toString() ?? '');
    } else if (sortBy === 'date') {
      return direction * (new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'created_at') {
      return direction * (new Date(a.created_at) - new Date(b.created_at));
    } else if (sortBy === 'email') {
      return direction * (a.email?.toString() ?? '').localeCompare(b.email?.toString() ?? '');
    } else if (sortBy === 'name') {
      return direction * (a.name?.toString() ?? '').localeCompare(b.name?.toString() ?? '');
    } else if (sortBy === 'start_date') {
      return direction * (new Date(a.start_date) - new Date(b.start_date));
    } else if (sortBy === 'end_date') {
      return direction * (new Date(a.end_date) - new Date(b.end_date));
    } else if (sortBy === 'article_number') {
      return direction * (a.article_number?.toString() ?? '').localeCompare(b.article_number?.toString() ?? '');
    } else if (sortBy === 'hotel_name') {
      return direction * (a.hotel_name?.toString() ?? '').localeCompare(b.hotel_name?.toString() ?? '');
    } else if (sortBy === 'arrival_country') {
      return direction * (a.arrival_country?.toString() ?? '').localeCompare(b.arrival_country?.toString() ?? '');
    } else if (sortBy === 'departure_city') {
      return direction * (a.departure_city?.toString() ?? '').localeCompare(b.departure_city?.toString() ?? '');
    } else if (sortBy === 'arrival_city') {
      return direction * (a.arrival_city?.toString() ?? '').localeCompare(b.arrival_city?.toString() ?? '');
    } else if (sortBy === 'price') {
      return direction * (Number(a.price) - Number(b.price));
    } else if (sortBy === 'status') {
      return direction * (a.status?.toString() ?? '').localeCompare(b.status?.toString() ?? '');
    }else if (sortBy === 'communication_method') {
      return direction * (a.communication_method?.toString() ?? '').localeCompare(b.communication_method?.toString() ?? '');
    }else if (sortBy === 'communication_time') {
      return direction * (a.communication_time?.toString() ?? '').localeCompare(b.communication_time?.toString() ?? '');
    } else if (sortBy === 'direction') {
      return direction * (a.direction?.toString() ?? '').localeCompare(b.direction?.toString() ?? '');
    }

    return 0;
  });
};

