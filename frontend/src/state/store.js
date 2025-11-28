import { create } from "zustand";
import createAuthSlice from "./slices/authSlice";
import createPermissionSlice from "./slices/permissionSlice";
import rolesSlice from "./slices/rolesSlice";
import addUserSlice from "./slices/addUserSlice";
import addPaginationSlice from "./slices/addPaginationSlice";
import createCategoryFilterSlice from "./slices/categoryFilterSlice";
import companyDetailSlice from "./slices/companyDetailSlice";
import addSearchTerm from "./slices/addSearchTerm";
import useLoaderSlice from "./slices/useLoaderSlice";
import importStateSlice from "./slices/importStateSlice";
import zoomSlice from "./slices/zoomSlice";

const useStore = create((set) => ({
  ...createAuthSlice(set),
  ...createPermissionSlice(set),
  ...rolesSlice(set),
  ...addUserSlice(set),
  ...addPaginationSlice(set),
  ...createCategoryFilterSlice(set),
  ...companyDetailSlice(set),
  ...addSearchTerm(set),
  ...useLoaderSlice(set),
  ...importStateSlice(set),
  ...zoomSlice(set),

}));

export default useStore;

