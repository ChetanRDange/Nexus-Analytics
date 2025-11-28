const createPermissionSlice = (set) => ({
  admin: {
    _id: null,
    name: "",
    email: "",
    isSuperAdmin: false,
    isVerified: false,
    roles: {
      _id: "",
      name: "",
    },
    phone: {},
    avatar: "",
    permissions: {},
  },
  setAdmin: (newAdmin) =>
    set((state) => ({
      admin: {
        ...state.admin,
        ...newAdmin,
      },
    })),
});

export default createPermissionSlice;
