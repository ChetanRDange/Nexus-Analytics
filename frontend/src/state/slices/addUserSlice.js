const createAddUserSlice = (set) => ({
  user: {
    name: "",
    email: "",
    phone: "",
    country: "",
    roles: {},
  },
  setUser: (newuser) =>
    set((state) => ({
      user: {
        ...state.user,
        ...newuser,
      },
    })),
});

export default createAddUserSlice;
