import React from 'react'
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import usersReducer from "./usersSlice"
import infoSheetSlice from "./infoSheetSlice"

export const store = configureStore ({
  reducer:{
    auth: authReducer,
    users: usersReducer,
    infoSheet: infoSheetSlice,
  }
});
