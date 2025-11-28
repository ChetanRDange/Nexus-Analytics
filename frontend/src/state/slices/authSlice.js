const createAuthSlice = (set) => ({
  adminEmail: "",
  adminPassword: "",

  //update email
  setEmail: (adminEmail) => set({ adminEmail }),

  //update password
  setPassword: (adminPassword) => set({ adminPassword }),

  // Reset both email and password
  resetAuth: () => set({ adminEmail: "", adminPassword: "" }),
});

export default createAuthSlice;
