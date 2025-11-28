const createRolesSlice = () => ({
  allRoles: [],
  setRoles: (permission) => set({ permissions: permission }),
});

export default createRolesSlice;
