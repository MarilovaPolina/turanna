import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTourPackage = createAsyncThunk(
  'tourPackage/createTourPackage',
  async (formState, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const formData = new FormData();

      formData.append('title', formState.package_name);
      formData.append('departure_city', formState.departure_city);
      formData.append('arrival_city', formState.arrival_city);
      formData.append('description', JSON.stringify(formState.description));

      if (formState.galleryImages.length > 0) {
        formData.append('main_image', formState.galleryImages[0].file);
      }

      formState.galleryImages.forEach((imgObj) => {
        formData.append('gallery[]', imgObj.file);
      });

      const tours = formState.tourVariants.map((variant) => {
        const detailsFields = [
          'room_class',
          'age_limit',
          'all_inclusive',
          'hotel_link',
          'distance_center',
          'distance_airport',
          'distance_lift',
          'distance_nature',
          'distance_beach',
          'beach_type',
          'childcare',
          'pool',
          'gym',
          'pets_allowed',
          'airline',
          'visa_required',
        ];

        const details = {};
        detailsFields.forEach((field) => {
          details[field] = variant[field] === '' ? null : variant[field];
        });

        return {
          hotel_name: variant.hotel_name,
          hotel_image: '',
          departure_city: variant.departure_city,
          arrival_city: variant.arrival_city,
          arrival_country: variant.arrival_country,
          start_date: variant.tour_start,
          end_date: variant.tour_finish,
          nights: variant.tour_nights,
          price: variant.tour_price,
          price_type: variant.price_type,
          status: 'active',
          image_text_copyright: variant.image_text_copyright,
          image_link_copyright: variant.image_link_copyright,
          tour_category: variant.tour_category,
          article_number: variant.article_number,
          details: details,
        };
      });

      formData.append('tours', JSON.stringify(tours));

      if (formState.hotelImages && Array.isArray(formState.hotelImages)) {
        formState.hotelImages.forEach((imgObj) => {
          if (imgObj && imgObj.file) {
            formData.append('hotel_images[]', imgObj.file);
          }
        });
      }

      const { data } = await axios.post('http://localhost:8000/api/tour-packages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return data;
    } catch (error) {
      if (error.response?.status === 422) {
        console.error('Ошибка:', error.response);
        const errors = error.response.data.errors;
        const errorMessage = Object.values(errors).flat().join(' ');
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue(error.response?.data?.message || 'Ошибка при создании подборки');
    }
  },
);

export const getAllTours = createAsyncThunk(
  'tourPackage/getAllTours',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('http://localhost:8000/api/tours', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке туров');
    }
  },
);

export const deleteTour = createAsyncThunk(
  'tourPackage/deleteTour',
  async (tourId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await axios.delete(`http://localhost:8000/api/tours/${tourId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return tourId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при удалении тура');
    }
  },
);

export const getTourPackageById = createAsyncThunk(
  'tourPackage/getTourPackageById',
  async (id, { rejectWithValue}) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tour-packages/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка при загрузке туристической подборки',
      );
    }
  },
);

export const updateTourPackage = createAsyncThunk(
  'tourPackage/updateTourPackage',
  async ({ id, formState }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const formData = new FormData();

      formData.append('title', formState.package_name);
      formData.append('departure_city', formState.departure_city);
      formData.append('arrival_city', formState.arrival_city);
      formData.append('description', JSON.stringify(formState.description));

      if (formState.galleryImages[0]?.file) {
        formData.append('main_image', formState.galleryImages[0].file);
      }

      formState.galleryImages.forEach((imgObj) => {
        if (imgObj.file) {
          formData.append('gallery[]', imgObj.file);
        }
      });

      const tours = formState.tourVariants.map((variant) => {
        const detailsFields = [
          'room_class',
          'age_limit',
          'all_inclusive',
          'hotel_link',
          'distance_center',
          'distance_airport',
          'distance_lift',
          'distance_nature',
          'distance_beach',
          'beach_type',
          'childcare',
          'pool',
          'gym',
          'pets_allowed',
          'airline',
          'visa_required',
        ];

        const details = {};
        detailsFields.forEach((field) => {
          details[field] = variant[field] === '' ? null : variant[field];
        });

        return {
          id: variant.id,
          hotel_name: variant.hotel_name,
          departure_city: variant.departure_city,
          arrival_city: variant.arrival_city,
          arrival_country: variant.arrival_country,
          start_date: variant.tour_start,
          end_date: variant.tour_finish,
          nights: variant.tour_nights,
          price: variant.tour_price,
          price_type: variant.price_type,
          status: variant.status,
          image_text_copyright: variant.image_text_copyright,
          image_link_copyright: variant.image_link_copyright,
          tour_category: variant.tour_category,
          article_number: variant.article_number,
          details,
        };
      });

      formData.append('tours', JSON.stringify(tours));
      formData.append('_method', 'PUT');

      if (formState.hotelImages && formState.hotelImages.length > 0) {
        formState.hotelImages.forEach((imgObj, index) => {
          if (imgObj?.file) {
            formData.append(`hotel_image_${index}`, imgObj.file);
          }
        });
      }

      const { data } = await axios.post(`http://localhost:8000/api/tour-packages/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении');
    }
  },
);

const tourPackagesSlice = createSlice({
  name: 'tourPackage',
  initialState: {
    loading: false,
    success: false,
    error: null,
    createdPackage: null,
    tourVariants: [],
    toursList: [],
  },
  reducers: {
    addTourVariant: (state) => {
      state.tourVariants.push({
        hotel_name: '',
        hotel_image: null,
        departure_city: '',
        arrival_city: '',
        arrival_country: '',
        tour_start: '',
        tour_finish: '',
        tour_nights: '',
        tour_price: '',
        price_type: 'per_person',
        status: 'active',
        image_text_copyright: '',
        image_link_copyright: '',
        tour_category: '',
        article_number: '',
        room_class: '',
        age_limit: '',
        all_inclusive: '',
        hotel_link: '',
        distance_center: '',
        distance_airport: '',
        distance_lift: '',
        distance_nature: '',
        distance_beach: '',
        beach_type: '',
        childcare: '',
        pool: '',
        gym: '',
        pets_allowed: '',
        airline: '',
        visa_required: '',
      });
    },
    removeTourVariant: (state, action) => {
      state.tourVariants.splice(action.payload, 1);
    },
    copyTourVariant: (state, action) => {
      const original = state.tourVariants[action.payload];
      if (original) {
        state.tourVariants.push(JSON.parse(JSON.stringify(original)));
      }
    },
    updateTourVariantField: (state, action) => {
      const { index, field, value } = action.payload;
      state.tourVariants[index][field] = value;
    },
    resetSuccess(state) {
      state.success = false;
    },
     resetTourVariants(state) {
      state.tourVariants = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTourPackage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createTourPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdPackage = action.payload;
      })
      .addCase(createTourPackage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      .addCase(getAllTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTours.fulfilled, (state, action) => {
        state.loading = false;
        state.toursList = action.payload;
      })
      .addCase(getAllTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTour.fulfilled, (state, action) => {
        state.toursList = state.toursList.filter((tour) => tour.id !== action.payload);
      })

      .addCase(getTourPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTourPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPackage = action.payload;
      })
      .addCase(getTourPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTourPackage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateTourPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selectedPackage = action.payload;
      })
      .addCase(updateTourPackage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const {
  addTourVariant,
  removeTourVariant,
  copyTourVariant,
  updateTourVariantField,
  resetSuccess,
  resetTourVariants
} = tourPackagesSlice.actions;
export default tourPackagesSlice.reducer;
