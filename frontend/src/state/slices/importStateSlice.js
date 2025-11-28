const importStateSlice = (set) => ({
  isFileImported: false,
  fileImportedData: [],
  setFileImportedData: (data) => set({ fileImportedData: data }),
  setIsFileImported: (isFileImported) => set({ isFileImported }),
});

export default importStateSlice;
