import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import infoSheetReducer from "./infoSheetSlice";
import tableSortReducer from "./tableSortSlice";
import articlesReducer from "./articlesSlice";
import certificatesReducer from "./certificatesSlice";
import applicationsReducer from "./applicationsSlice";
import tourPackagesReducer from "./tourPackagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    infoSheet: infoSheetReducer,
    tableSort: tableSortReducer, 
    article: articlesReducer,
    certificates: certificatesReducer, 
    applications: applicationsReducer,
    tourPackage: tourPackagesReducer,
  }
});