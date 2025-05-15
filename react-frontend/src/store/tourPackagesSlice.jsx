// features/tourPackages/tourPackageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTourPackage = createAsyncThunk(
  'tourPackage/createTourPackage',
  async (formState, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const formData = new FormData();

      // tour_package
      formData.append('title', formState.package_name);
      formData.append('departure_city', formState.departure_city);
      formData.append('arrival_city', formState.arrival_city);
      formData.append('description', JSON.stringify(formState.description));

      // main image upload
      if (formState.galleryImages.length > 0) {
        formData.append('main_image', formState.galleryImages[0].file);
      }

      // image gallery
      formState.galleryImages.forEach((imgObj) => {
        formData.append('gallery[]', imgObj.file);
      });

      // tour details
      const tours = formState.tourVariants.map((variant) => {
        const detailsFields = [
          "room_class", "age_limit", "all_inclusive", "hotel_link", "distance_center", "distance_airport", 
          "distance_lift", "distance_nature", "distance_beach", "beach_type", "childcare", "pool", "gym", "pets_allowed",
           "airline", "visa_required"
        ];

        const details = {};
        detailsFields.forEach(field => {
          details[field] = variant[field] === '' ? null : variant[field];
        });

        return {
          hotel_name: variant.hotel_name,
          hotel_image: '', 
          departure_city: variant.departure_city,
          arrival_city: variant.arrival_city,
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
          details: details
        };
      });

      formData.append('tours', JSON.stringify(tours));

      formState.tourVariants.forEach((variant) => {
        if (variant.hotel_image && variant.hotel_image.file) {
          formData.append('hotel_images[]', variant.hotel_image.file);
        }
      });

      console.log('Отправляемые данные:');
for (let [key, value] of formData.entries()) {
  console.log(key, value);
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
  }
);

const tourPackagesSlice = createSlice({
  name: 'tourPackage',
  initialState: {
    loading: false,
    success: false,
    error: null,
    createdPackage: null,
  },
  reducers: {},
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
        state.error = action.payload;
      });
  },
});

export default tourPackagesSlice.reducer;
