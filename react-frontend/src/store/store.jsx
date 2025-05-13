import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import usersReducer from "./usersSlice"
import infoSheetSlice from "./infoSheetSlice"
import tableSortSlice from "./tableSortSlice"
import articlesSlice from "./articlesSlice"
import certificatesSlice from "./certificatesSlice"
import applicationsSlice from "./applicationsSlice"
import tourPackageSlice from "./tourPackageSlice"

export const store = configureStore ({
  reducer:{
    auth: authReducer,
    users: usersReducer,
    infoSheet: infoSheetSlice,
    tableSort: tableSortSlice,
    article: articlesSlice,
    certificates: certificatesSlice,
    applications: applicationsSlice,
    tourPackage: tourPackageSlice,
  }
});
