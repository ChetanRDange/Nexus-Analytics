const zoomSlice = (set) => ({
    zoomValue: 100,
    setZoomGlobalValue: (value) => set({ zoomValue: value }),
  });
  
  export default zoomSlice;