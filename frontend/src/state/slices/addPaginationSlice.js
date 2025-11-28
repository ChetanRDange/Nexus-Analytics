const createAddPaginationSlice = (set, get) => ({
  currentPaginatedPage: 1,
  currentItemsPerPage: 10,
  usePagination: true,
  setUsePagination: (usePagination) => set({ usePagination }),
  setCurrentPaginatedPage: (page) => set({ currentPaginatedPage: page }),
  setCurrentItemsPerPage: (itemsPerPage) =>
    set({ currentItemsPerPage: itemsPerPage }),
});

export default createAddPaginationSlice;
