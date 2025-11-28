const useLoaderSlice = (set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
});

export default useLoaderSlice;
