const createCategoryFilterSlice = (set, get) => ({
  selectedCategory: null,
  currentSelectedCategory: null,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setCurrentSelectedCategory: (category) =>
    set({ currentSelectedCategory: category }),
});
export default createCategoryFilterSlice;
