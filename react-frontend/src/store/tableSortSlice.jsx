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
      return direction * (new Date(a.date) - new Date(b.date));
    }else if (sortBy === 'email') {
      return direction * a.email.localeCompare(b.email);
    }else if (sortBy === 'name') {
      return direction * a.name.localeCompare(b.name);
    }else if (sortBy === 'start_date') {
      return direction * (new Date(a.start_date) - new Date(b.start_date));
    }else if (sortBy === 'end_date') {
      return direction * (new Date(a.end_date) - new Date(b.end_date));
    }else if (sortBy === 'article_number') {
      return direction * a.article_number.localeCompare(b.article_number);
    }else if (sortBy === 'hotel_name') {
      return direction * a.hotel_name.localeCompare(b.hotel_name);
    }else if (sortBy === 'arrival_country') {
      return direction * a.arrival_country.localeCompare(b.arrival_country);
    }else if (sortBy === 'departure_city') {
      return direction * a.departure_city.localeCompare(b.departure_city);
    }else if (sortBy === 'arrival_city') {
      return direction * a.arrival_city.localeCompare(b.arrival_city);
    }else if (sortBy === 'price') {
      return direction * (Number(a.price) - Number(b.price));
    }

    return 0;
  });
};
