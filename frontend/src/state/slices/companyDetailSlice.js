const companyDetailSlice = (set) => ({
  companyDetails: {
    companyName: "",
    name: "",
    email: "",
    phone: "",
    companySettings: "",
  },

  setCompanyDetails: (newDetails) =>
    set((state) => ({
      companyDetails: {
        ...state.companyDetails,
        ...newDetails,
      },
    })),
});

export default companyDetailSlice;
