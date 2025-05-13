
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createTourPackage = createAsyncThunk(
  'tourPackages/create',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      const token = auth?.token

      const headers = {
        Authorization: `Bearer ${token}`,
      }

      // 1. Создание турпакета
      const { data: tourPackage } = await axios.post(
        'http://localhost:8000/api/tour-packages',
        {
          package_name: payload.package_name,
          departure_city: payload.departure_city,
          arrival_city: payload.arrival_city,
          description: payload.description,
        },
        { headers }
      )

      const tourPackageId = tourPackage.id

      // 2. Загрузка изображений галереи
      for (const file of payload.galleryImages) {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('tour_package_id', tourPackageId)

        await axios.post(
          'http://localhost:8000/api/tour-package-images',
          formData,
          { headers }
        )
      }

      // 3. Создание туров и деталей
      for (const tour of payload.tourVariants) {
        const formData = new FormData()
        formData.append('hotel_image', tour.hotel_image)
        formData.append('hotel_name', tour.hotel_name)
        formData.append('departure_city', tour.departure_city)
        formData.append('arrival_city', tour.arrival_city)
        formData.append('start_date', tour.tour_start)
        formData.append('end_date', tour.tour_finish)
        formData.append('nights', tour.tour_nights)
        formData.append('price', tour.tour_price)
        formData.append('price_type', tour.price_type)
        formData.append('image_text_copyright', tour.image_text_copyright)
        formData.append('image_link_copyright', tour.image_link_copyright)
        formData.append('tour_package_id', tourPackageId)

        const { data: createdTour } = await axios.post(
          'http://localhost:8000/api/tours',
          formData,
          { headers }
        )

        const tourId = createdTour.id

        for (const detail of tour.details) {
          await axios.post(
            'http://localhost:8000/api/tour-details',
            {
                tour_id: tourId,
                room_class: detail.room_comfort,
                age_limit: detail.age_limit,
                all_inclusive: detail.all_inclusive,
                hotel_link: detail.hotel_link,
                distance_center: detail.distance_to_center,
                distance_airport: detail.distance_to_airport,
                distance_lift: detail.distance_to_lift,
                distance_nature: detail.distance_to_nature,
                distance_beach: detail.distance_to_beach,
                beach_type: detail.beach_type,
                childcare: detail.child_care,
                pool: detail.hotel_pool,
                gym: detail.hotel_gym,
                pets_allowed: detail.animals,
                airline: detail.airline,
                visa_required: detail.visa,
            },
            { headers }
          )
        }
      }

      return tourPackage
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)
const tourPackageSlice = createSlice({
  name: 'tourPackages',
  initialState: {
    loading: false,
    error: null,
    success: false,
    tourPackages: [],
  },
  reducers: {
    resetTourPackageState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTourPackage.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createTourPackage.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.tourPackages.push(action.payload)
      })
      .addCase(createTourPackage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
  },
})

export const { resetTourPackageState } = tourPackageSlice.actions
export default tourPackageSlice.reducer

